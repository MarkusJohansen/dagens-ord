from pydantic import BaseModel


class Expression(BaseModel):
    expression : str
    example : str
    definition : str
    
print(Expression(expression="test", example="test", definition="test"))
