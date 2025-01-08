import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from expression import Expression
from supabase import create_client, Client

import os
from dotenv import load_dotenv
import logging

load_dotenv()

# Create a new Supabase client and fastapi app
supabase: Client = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))
app = FastAPI()

# Allow all origins (you can specify a specific frontend URL for more security)
origins = os.getenv("ORIGINS").split(",")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allow specific origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

#GET
@app.get("/expressions")
async def get_all_expressions():
    return supabase.table("expressions").select("*", count="exact").execute()

@app.get("/suggestions")
async def get_all_suggestions():
    return supabase.table("suggestions").select("*", count="exact").order("id", desc=True).execute()

@app.get("/search/{query}")
async def search_expression(query: str):
    return supabase.table("expressions").select("*").ilike("expression", f"%{query}%").execute()

@app.get("/random_expression")
async def fetch_random_expression():
    return supabase.table("random_expression").select("*").eq("nsfw", False).limit(1).execute()

@app.get("/suggestion_count")
async def fetch_suggestion_count():
    return {"count": supabase.table("suggestions").select("id", count="exact").execute().count}

#POST
@app.post("/suggest/")
async def suggest_expression(expression: Expression):
    result = supabase.table("suggestions").insert({
        "expression": expression.expression,
        "example": expression.example,
        "definition": expression.definition,
    }).execute()
    return {"data": result}

@app.post("/add/{suggest_id}")
async def add_expression(suggest_id: int):
    suggestion = supabase.table("suggestions").select("expression").eq("id", suggest_id).execute()
    expression = Expression(
        expression=suggestion["expression"],
        example=suggestion["example"],
        definition=suggestion["definition"],
        nsfw=suggestion["nsfw"]
    )
    return {"data": supabase.table("expressions").insert({"expression": expression}).execute()}

#PUTS
@app.put("/suggestions/{suggestion_id}")
async def update_suggestion(
    suggestion_id: int,
    suggestion: Expression
):
    # Perform the update in Supabase
    response = supabase.table("suggestions").update({
        "expression": suggestion.expression,
        "example": suggestion.example,
        "definition": suggestion.definition,
    }).eq("id", suggestion_id).execute()

    return {"message": "Suggestion updated successfully", "data": response.data}


# DELETES
@app.delete("/suggestions/{suggest_id}")
async def delete_suggestion(suggest_id: int):
    return {"data": supabase.table("suggestions").delete().filter("id", "eq", suggest_id).execute()}


#TODO deploy to backend and add url to local and github environment for frontend apps