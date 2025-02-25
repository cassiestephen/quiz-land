import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# only allow frontend to access api
origins = [
    "http://localhost:5173"
]

# cors helps protect in the middle
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True, # allows us to send jwt tokens and such
    allow_methods=["*"], # allows all methods
    allow_headers=["*"], # allows all headers
)

@app.get("/api/message")
def get_message():
    return {"message": "Hello from FastAPI!"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
