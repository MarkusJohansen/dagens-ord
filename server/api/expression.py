from pydantic import BaseModel


class Expression(BaseModel):
    expression : str
    example : str
    definition : str
    nsfw: bool = False
