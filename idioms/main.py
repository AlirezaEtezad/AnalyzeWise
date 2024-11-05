from fastapi import FastAPI
# from pydantic import BaseModel
# from typing import List

app = FastAPI()

class IdiomInfo:
    def __init__(self, idiom: str, meaning: str, example: str):
        self.idiom = idiom
        self.meaning = meaning
        self.example = example

@app.get("/idioms")
def get_idioms():
    idioms = [
        IdiomInfo(
            idiom="Break the ice",
            meaning="To initiate conversation in a social setting",
            example="She told a joke to break the ice at the party."
        ),
        IdiomInfo(
            idiom="A blessing in disguise",
            meaning="A good thing that seemed bad at first",
            example="Losing that job was a blessing in disguise, as it led me to start my own business."
        ),
        IdiomInfo(
            idiom="Bite the bullet",
            meaning="To endure something difficult or unpleasant",
            example="I hate going to the dentist, but I guess I'll have to bite the bullet."
        ),
        IdiomInfo(
            idiom="Let the cat out of the bag",
            meaning="To reveal a secret accidentally or unintentionally",
            example="We were planning a surprise party, but John let the cat out of the bag."
        ),
        IdiomInfo(
            idiom="Hit the nail on the head",
            meaning="To describe exactly what is causing a situation or problem",
            example="You hit the nail on the head with your analysis of the problem."
        ),
        IdiomInfo(
            idiom="The ball is in your court",
            meaning="It's up to you to take the next step or decision",
            example="I've done all I can. Now, the ball is in your court."
        )
    ]
    return {"idioms": [{"idiom": i.idiom, "meaning": i.meaning, "example": i.example} for i in idioms]}

