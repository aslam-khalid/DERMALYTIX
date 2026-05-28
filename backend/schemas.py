from typing import List, Optional

from pydantic import BaseModel


class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str
    age: Optional[int] = None
    gender: Optional[str] = None
    skin_type: Optional[str] = None


class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    user_id: str
    name: str


class HistoryItem(BaseModel):
    session_id: str
    condition: str
    display_label: str
    confidence: float
    severity: str
    skin_type: Optional[str] = None
    see_doctor: bool = False
    image_url: Optional[str] = None
    created_at: str


class HistoryResponse(BaseModel):
    user_id: str
    total: int
    history: List[HistoryItem]
