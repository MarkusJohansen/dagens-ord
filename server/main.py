import os
from fastapi import FastAPI
from .expression import Expression
from supabase import create_client, Client

import os
from dotenv import load_dotenv

load_dotenv()

# Create a new Supabase client and fastapi app
supabase: Client = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))
app = FastAPI()

#GETS
@app.get("/")
async def get_all_expressions():
    return supabase.table("expressions").select("*", count="exact").execute()

@app.get("/suggestions")
async def get_all_suggestions():
    return supabase.table("suggestions").select("*", count="exact").execute()

@app.post("/search/{query}")
async def search_expression(query: str):
    return supabase.table("expressions").select("*").ilike("expression", f"%{query}%").execute()

#test


#TODO: Implement the following routes
# @app.get("/random_expression")
# async def fetch_random_expression():
#     return supabase.table("expressions").select("*").eq("nsfw", False).limit(1).execute()
    
# @app.get("/suggestion_count")
# async def fetch_suggestion_count():
#     return {"count": supabase.table("suggestions").select("id", count="exact").execute().count}

# @app.get("/suggestions") 
# async def fetch_all_suggestions():
#     return {"data": supabase.table("suggestions").select("*").execute()}

# #POSTS    
# @app.post("/suggest/{expression}")
# async def suggest_expression(expression: Expression):
#     return {"data": supabase.table("suggestions").insert({"expression": expression}).execute()}

# @app.post("/add/{suggest_id}")
# async def add_expression(suggest_id: int):
#     suggestion = supabase.table("suggestions").select("expression").eq("id", suggest_id).execute()
#     expression = Expression(
#         expression=suggestion["expression"],
#         example=suggestion["example"],
#         definition=suggestion["definition"]
#     )
#     return {"data": supabase.table("expressions").insert({"expression": expression}).execute()}

# # DELETES
# @app.delete("/delete/{suggest_id}")
# async def delete_suggestion(suggest_id: int):
#     return {"data": supabase.table("suggestions").eq("id", suggest_id).delete().execute()}

# #PUTS
