# API Documentation

## Emotion-Based Music Recommendation API

### Base URL
```
http://localhost:8000/api
```

## Endpoints

### 1. Get Music Recommendations

**Endpoint**: `POST /recommendations`

**Description**: Get music recommendations based on user's current emotion

**Request Body**:
```json
{
  "emotion_description": "Yağmurlu bir günde gelen hafif melankoli ama aynı zamanda çalışma isteği",
  "user_id": "user123",
  "count": 10,
  "exclude_genres": ["heavy-metal", "death-metal"],
  "language": "tr"
}
```

**Response**:
```json
{
  "status": "success",
  "recommendations": [
    {
      "song_id": "abc123",
      "title": "Song Title",
      "artist": "Artist Name",
      "similarity_score": 0.95,
      "emotion_match": 0.92,
      "spotify_url": "https://open.spotify.com/track/..."
    }
  ],
  "filter_applied": true,
  "processing_time_ms": 245
}
```

### 2. Analyze User Emotion

**Endpoint**: `POST /emotions/analyze`

**Description**: Analyze and extract emotion from natural language input

**Request Body**:
```json
{
  "text": "Bugün çok mutsuzum, ama müzik dinlemek istiyorum",
  "language": "tr"
}
```

**Response**:
```json
{
  "primary_emotion": "sadness",
  "secondary_emotions": ["hope", "motivation"],
  "confidence": 0.88,
  "emotion_vector": [0.1, -0.8, 0.3, ...]
}
```

### 3. Get User Preferences

**Endpoint**: `GET /users/{user_id}/preferences`

**Description**: Get user's stored music preferences and negative filters

**Response**:
```json
{
  "user_id": "user123",
  "favorite_genres": ["pop", "indie", "alternative"],
  "excluded_genres": ["heavy-metal"],
  "preferred_tempo_range": [100, 150],
  "negative_filters": [
    {
      "type": "genre",
      "value": "death-metal"
    }
  ]
}
```

### 4. Update Recommendation Feedback

**Endpoint**: `POST /recommendations/{recommendation_id}/feedback`

**Description**: Send feedback about a recommendation (skip, like, dislike)

**Request Body**:
```json
{
  "user_id": "user123",
  "action": "like",
  "reason": "perfect_mood_match",
  "timestamp": "2024-03-31T19:40:00Z"
}
```

### 5. Get Recommendation History

**Endpoint**: `GET /users/{user_id}/history`

**Description**: Get past recommendations and their feedback

**Query Parameters**:
- `limit`: Number of records (default: 50)
- `offset`: Pagination offset (default: 0)
- `filter`: Filter by action (like, skip, dislike)

**Response**:
```json
{
  "total": 150,
  "items": [
    {
      "timestamp": "2024-03-31T19:30:00Z",
      "song_id": "abc123",
      "emotion_context": "sad but motivated",
      "feedback": "like",
      "emotion_match_score": 0.92
    }
  ]
}
```

## Error Responses

### 400 Bad Request
```json
{
  "status": "error",
  "code": "INVALID_INPUT",
  "message": "emotion_description is required"
}
```

### 401 Unauthorized
```json
{
  "status": "error",
  "code": "UNAUTHORIZED",
  "message": "Authentication required"
}
```

### 429 Too Many Requests
```json
{
  "status": "error",
  "code": "RATE_LIMIT_EXCEEDED",
  "message": "Too many requests. Try again later."
}
```

## Authentication

All endpoints require Bearer token authentication:

```
Authorization: Bearer YOUR_API_KEY
```

## Rate Limits

- **Free Tier**: 100 requests/hour
- **Pro Tier**: 1000 requests/hour
- **Enterprise**: Custom limits

## Pagination

Use `limit` and `offset` parameters for pagination:

```
GET /recommendations?limit=20&offset=40
```

---

For more information, see the main [README.md](../README.md)
