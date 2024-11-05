from sqlmodel import SQLModel, create_engine, Field, Session, select, Relationship
from pydantic import BaseModel, validator, ValidationError, EmailStr,constr  #pydantic will check the validation
from datetime import datetime
from typing import Optional
# PyDantic models for request validation

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    first_name: str
    last_name: str
    email: str
    age: int
    city: str
    country: str
    password: str
    join_time: datetime = Field(default_factory=datetime.now)
    role: str = Field(default="user")

    comments: list["Comment"] = Relationship(back_populates="user")


class Comment(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    content: str
    timestamp: datetime = Field(default_factory=datetime.now)
    user_id: int = Field(foreign_key="user.id")
    approved: bool = Field(default=False)

    user: "User" = Relationship(back_populates="comments")


class Topic(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    title: str
    timestamp: datetime = Field(default_factory=datetime.now)
    text: str
    user_id: int = Field(foreign_key="user.id")

    user: "User" = Relationship() 

# DATABASE_URL = "postgres://koyeb-adm:a5JWI8dmHpLs@ep-purple-union-a2cc3xil.eu-central-1.pg.koyeb.app/koyebdb"
DATABASE_URL = "postgresql://admin:123@analyzewise_postgres:5432/analyzewise_db"
# DATABASE_URL = "sqlite:///./database.db"
engine = create_engine(DATABASE_URL, echo=True)
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
