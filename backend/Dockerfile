FROM python:3.12-slim

# Prevent Python from writing .pyc files / buffering


# Set work directory
WORKDIR /

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade -r requirements.txt

# Copy project files
COPY . /app

# Expose FastAPI default port
EXPOSE 8000

# Start FastAPI dev server
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
