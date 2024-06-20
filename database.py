from sqlmodel import SQLModel, create_engine, Field, Session, select
from pydantic import BaseModel, validator, ValidationError, EmailStr,constr  #pydantic will check the validation
from datetime import datetime
from typing import Optional
# PyDantic models for request validation

# class User(SQLModel, table=True):
#     id: int = Field(default=None, primary_key=True)
#     city: str
#     username: str = Field()
#     password: str = Field()




class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    first_name: str
    last_name: str
    email: str
    age: int
    city: str
    country: str
    password: str
    join_time: datetime = Field(default_factory=datetime.utcnow)

engine = create_engine("sqlite:///./database.db", echo=True)
SQLModel.metadata.create_all(engine)

class RegisterModel(BaseModel):
    first_name: str
    last_name: str
    email: str
    age: int
    city: str
    country: str
    password: str
    confirm_password: str


    @validator('age')
    def age_must_be_positive(cls, v):
        if v <= 0:
            raise ValueError('Age must be positive')
        return v

    @validator('password')
    def password_min_length(cls, v):
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters long')
        return v

    @validator('confirm_password')
    def passwords_match(cls, v, values, **kwargs):
        if 'password' in values and v != values['password']:
            raise ValueError('Passwords do not match')
        return v

    @validator('city', 'country')
    def must_be_alphabetic(cls, v):
        if not v.isalpha():
            raise ValueError('City and Country must contain only alphabetic characters')
        return v
    
    # @validator('city')
    # def city_must_be_alphabetic(cls, value):
    #     if not value.isalpha():
    #         raise ValueError('City must contain only alphabetic characters')
    #     return value

class LoginModel(BaseModel):
    email: str
    password: str
