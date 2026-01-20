try:
    from pydantic_ai.providers import KNOWN_PROVIDERS
    print("Known providers:", KNOWN_PROVIDERS)
except ImportError:
    pass

try:
    from pydantic_ai.models.gemini import GeminiModel
    print("GeminiModel found!")
except ImportError as e:
    print("GeminiModel import failed:", e)

try:
    from pydantic_ai.models.google import GoogleModel
    print("GoogleModel found!")
except ImportError as e:
    print("GoogleModel import failed:", e)
