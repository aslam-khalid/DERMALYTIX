"""Recommendation engine — re-exports notebook logic with condition key normalization."""

from recommendation_engine_src import (
    CONFIDENCE_THRESHOLD,
    ROUTINES,
    get_recommendation,
    get_severity,
    merge_routines,
)

# Model class name → ROUTINES dict key
CONDITION_ALIASES = {
    "wrinkles:FINE LINES": "wrinkles/FINE LINES",
    "wrinkles": "wrinkles/FINE LINES",
}


def normalize_condition(condition: str) -> str:
    return CONDITION_ALIASES.get(condition, condition)


def merge_routines_normalized(conditions_with_confidence, skin_type=None):
    normalized = [
        {
            "condition": normalize_condition(c["condition"]),
            "confidence": c["confidence"],
        }
        for c in conditions_with_confidence
    ]
    return merge_routines(normalized, skin_type=skin_type)


__all__ = [
    "CONFIDENCE_THRESHOLD",
    "ROUTINES",
    "get_recommendation",
    "get_severity",
    "merge_routines",
    "merge_routines_normalized",
    "normalize_condition",
]
