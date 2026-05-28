"""
Auto-extracted from recommendation_engine (1).ipynb
Pakistani skincare product pools + severity + merge_routines
"""
import random
from typing import Optional, List, Dict, Any



# ─────────────────────────────────────────────────────────────────
# PRODUCT POOLS — Researched Pakistani Market
# ─────────────────────────────────────────────────────────────────

ROUTINES: dict = {

    # ══════════════════════════════════════════════════════════════
    "Acne": {

        "mild": {
            "morning": {
                "cleanser": [
                    "Jenpharm MandelAC Face Wash",
                    "Conatural Tea Tree and Neem Acne Face Wash",
                     "Clarins Ultra Anti-Acne Face Wash",
                    "Accufix Salicylic Acid Fashwash"
                ],
                "serum": [
                    "The Ordinary Niacinamide 10% + Zinc 1%",
                    "AccuFix Niacinamide Serum"

                ],
                "moisturiser": [
                    "Conatural Aloe Vera Gel",
                    "Neutrogena Hydro Boost Water Gel",
                    "Jenpharm Dermive oil-free Moisturizing Wash",
                    "neue derma Moisturizer(gel)",
                ],
                "sunscreen": [

                    "Jenpharm Spectrablock SPF 100",
                    "Neutrogena Ultra Sheer SPF 50",
                    "AccuFix centella Sunscreen SPF 50",
                ],
            },
            "evening": {
                "cleanser": [
                    "Jenpharm MandelAC Face Wash",
                    "Conatural Tea Tree and Neem Acne Face Wash",
                     "Clarins Ultra Anti-Acne Face Wash",
                    "Accufix Salicylic Acid Fashwash"
                ],
                "treatment": [
                    "Jenpharm MandelAC Serum",
                    "AccuFix Mandelic Acid Exfoliant",
                    "The Ordinary Salicylic Acid 2% Solution",
                    "accsolve lotion",
                    "betasalic lotion"

                ],
              "moisturiser": [

                    "Neutrogena Hydro Boost Water Gel",
                    "Jenpharm Dermive oil-free Moisturizing Wash",
                    "neue derma Moisturizer(gel)",
                ],
            },
            "avoid": [
                "Heavy oily creams and coconut oil on face",
                "Popping or picking pimples",
                "Skipping moisturiser (causes more oil production)",
            ],
            "tip": (
                "Mild acne responds well to consistent cleansing and niacinamide. "
                "Give products at least 4 weeks before judging results."
            ),
            "see_doctor": False,
        },

        "moderate": {
            "morning": {
                "cleanser": [
                    "Jenpharm MandelAC Face Wash",
                    "Neutrogena Oil-Free Acne Wash",
                    "Conatural Tea Tree and Neem Acne Face Wash",
                    "AccuFix Hydrating Gentle Daily Cleanser",
                ],
                "serum": [
                    "The Ordinary Niacinamide 10% + Zinc 1%",
                    "AccuFix Niacinamide Serum",
                    "Jenpharm MandelAC Serum",
                    "Bio-One Niacinamide Serum",
                ],
                "moisturiser": [
                    "Neutrogena Hydro Boost Water Gel",
                    "Conatural Aloe Vera Gel",
                    "Jenpharm Dermive Oil Free Moisturizer",
                    "Neue derma Moisturizer(gel)",
                    "CeraVe AM Facial Moisturizing Lotion",
                ],
                "sunscreen": [

                    "Jenpharm spectra matt SPF 40",
                    "Neutrogena Ultra Sheer SPF 50",
                    "La Roche-Posay Anthelios UV Control Sunscreen SPF 50",
                    "AccuFix centella Sunscreen SPF 50",
                ],
            },
            "evening": {
                "cleanser": [
                    "Jenpharm MandelAC Face Wash",
                    "Neutrogena Oil-Free Acne Wash",
                    "Conatural Tea Tree and Neem Acne Face Wash",
                    "AccuFix Salicylic Acid Facewash"
                ],
                "treatment": [
                    "Jenpharm MandelAC Cream",
                    "AccuFix Salicyclic Acid serum",
                    "The Ordinary Salicylic Acid 2% Solution",
                    "acdermin gel"

                ],
                "moisturiser": [
                    "Neutrogena Hydro Boost Water Gel",
                    "Conatural Aloe Vera Gel",
                    "Jenpharm Dermive Oil Free Moisturizer",
                    "Neue derma Moisturizer(gel)",
                    "CeraVe AM Facial Moisturizing Lotion",
                ],
            },
            "avoid": [
                "Heavy oily moisturisers and body lotions on face",
                "Scrubs and harsh physical exfoliants",
                "Skipping SPF — UV worsens acne scars",
                "Touching face frequently",
            ],
            "tip": (
                "Moderate acne needs consistent actives like mandelic acid or salicylic acid. "
                "Pakistan's humidity makes acne worse — always cleanse after sweating."
            ),
            "see_doctor": False,
        },

        "severe": {
            "morning": {
                "cleanser": [
                    "Jenpharm MandelAC Face Wash",
                    "Neutrogena Oil-Free Acne Wash",
                    "AccuFix Hydrating Gentle Daily Cleanser",
                    "Cetaphil Gentle Foaming Cleanser",
                ],
                "serum": [
                    "Jenpharm MandelAC Serum",
                    "AccuFix Niacinamide Serum",
                    "The Ordinary Niacinamide 10% + Zinc 1%",
                   "Neue Derma Salicylic acid serum"
                ],
                "moisturiser": [
                    "CeraVe AM Facial Moisturizing Lotion",
                    "Neutrogena Hydro Boost Water Gel",
                    "Jenpharm Dermive Oil Free Moisturizer",
                    "Cetaphil Oil Control Moisturizer SPF 30",
                    "Neue Derma Moisturizer (gel)."
                ],
                "sunscreen": [
                    "Shade by ELIXIR SPF 50",
                    "Jenpharm Sunblock SPF 50",
                    "Neutrogena Ultra Sheer SPF 50",
                    "CeraVe Hydrating Sunscreen SPF 50",
                    "La Roche-Posay Anthelios UV Control Sunscreen SPF 50"
                ],
            },
            "evening": {
                "cleanser": [
                    "Jenpharm MandelAC Face Wash",
                    "Neutrogena Oil-Free Acne Wash",
                    "Cetaphil Gentle Foaming Cleanser",
                    "AccuFix Hydrating Gentle Daily Cleanser",
                ],
                "treatment": [
                    "Jenpharm MandelAC Cream",
                    "AccuFix Mandelic Acid Exfoliant",
                    "The Ordinary Salicylic Acid 2% Solution",
                    "Vince Anti-Acne Night Cream",
                ],
                "moisturiser": [
                    "CeraVe PM Facial Moisturizing Lotion",
                    "Neutrogena Hydro Boost Water Gel",
                    "Jenpharm Dermive Oil Free Moisturizer",
                    "Cetaphil Moisturizing Cream",
                ],
            },
            "avoid": [
                "Any product with heavy oils or comedogenic ingredients",
                "DIY remedies like toothpaste on pimples",
                "Steroid-based creams without doctor prescription",
                "Over-exfoliating — max once a week",
            ],
            "tip": (
                "Severe acne requires medical attention. "
                "Use this routine alongside dermatologist treatment, not instead of it."
            ),
            "see_doctor": True,
        },
    },

    # ══════════════════════════════════════════════════════════════
    "dark spots": {

        "mild": {
            "morning": {
                "cleanser": [
                    "Neutrogena hydro boost gel facewash ",
                    "Accufix SDaily hydrating Cleanser",
                    "Conatural Rose Face Wash"
                ],
                "serum": [
                    "Bio-One Vitamin C Serum",
                    "Vince Vitamin C Brightening Serum",
                    "Conatural Vitamin C Serum",
                    "The ordinary Theordinary best Ascorbyl Glucoside Solution 12%",
                ],
                "moisturiser": [
                    "Vince Whitening Moisturiser SPF 20",
                    "Neutrogena Hydro Boost Water Gel",
                    "Nivea Luminous 630 Day Cream",
                    "Neue Derma Mopisturizer(occlusive)"
                ],
                "sunscreen": [
                    "Neutrogena Ultra Sheer SPF 50",
                    "Jenpharm spectrablock Sunblock ",
                ],
            },
            "evening": {
                "cleanser": [
                    "Garnier Bright Complete Facewash",
                    "Vince Vitamin C Face Wash",
                    "Conatural Rose Face Wash",
                    "Jenpharm MandelAC Face Wash",
                ],
                "serum": [
                    "Saeed Ghani Kojic Acid Serum",
                    "Bio-One Vitamin C Serum",
                    "Vince Skin Lightening Night Serum",
                    "AccuFix Alpha Arbutin Serum",
                ],
                "moisturiser": [
                    "Vince Skin Lightening Night Cream",
                    "Garnier Bright Complete Night Cream",
                    "Nivea Luminous 630 Night Cream",
                    "Neutrogena Rapid Tone Repair Night Cream",
                ],
            },
            "avoid": [
                "Sun exposure without SPF — makes dark spots worse",
                "Skipping sunscreen even on cloudy days",
                "Harsh scrubs that irritate skin",
            ],
            "tip": (
                "SPF is the most important product for dark spots. "
                "Without it, no serum or cream will work. Apply every morning without fail."
            ),
            "see_doctor": False,
        },

        "moderate": {
            "morning": {
                "cleanser": [
                    "Neutrogena hydro boost gel facewash ",
                    "Accufix SDaily hydrating Cleanser",
                    "Conatural Rose Face Wash"
                ],
                "serum": [
                    "Bio-One Vitamin C Serum",
                    "Vince Vitamin C Brightening Serum",
                    "Conatural Vitamin C Serum",
                    "The ordinary Theordinary best Ascorbyl Glucoside Solution 12%",
                ],
                "moisturiser": [
                    "Vince Whitening Moisturiser SPF 20",
                    "Neutrogena Hydro Boost Water Gel",
                    "Nivea Luminous 630 Day Cream",
                    "Neue Derma Mopisturizer(occlusive)"
                ],
                "sunscreen": [
                    "Neutrogena Ultra Sheer SPF 50",
                    "Jenpharm spectrablock Sunblock ",
                ],
            },
            "evening": {
                "cleanser": [
                    "Garnier Bright Complete Facewash",
                    "Vince Vitamin C Face Wash",
                    "Conatural Rose Face Wash",
                    "Jenpharm MandelAC Face Wash",
                ],
                "serum": [
                    "Saeed Ghani Kojic Acid Serum",
                    "Bio-One Vitamin C Serum",
                    "Vince Skin Lightening Night Serum",
                    "AccuFix Alpha Arbutin Serum",
                ],
                "moisturiser": [
                    "Vince Skin Lightening Night Cream",
                    "Garnier Bright Complete Night Cream",
                    "Nivea Luminous 630 Night Cream",
                    "Neutrogena Rapid Tone Repair Night Cream",
                ],
            },
            "avoid": [
                "Steroid-based creams sold in Pakistan (e.g. medicated fairness creams)",
                "Skipping sunscreen — undoes all brightening progress",
                "Mixing too many actives at once (Vitamin C + AHA = irritation)",
            ],
            "tip": (
                "Moderate dark spots need Vitamin C in the morning and an exfoliant "
                "(AHA/kojic acid) at night. Be consistent for 8–12 weeks."
            ),
            "see_doctor": False,
        },

        "severe": {
            "morning": {
                "cleanser": [
                    "Neutrogena hydro boost gel facewash ",
                    "Accufix SDaily hydrating Cleanser",
                    "Conatural Rose Face Wash"
                ],
                "serum": [
                    "Bio-One Vitamin C Serum",
                    "Vince Vitamin C Brightening Serum",
                    "Conatural Vitamin C Serum",
                    "The ordinary Theordinary best Ascorbyl Glucoside Solution 12%",
                ],
                "moisturiser": [
                    "Vince Whitening Moisturiser SPF 20",
                    "Neutrogena Hydro Boost Water Gel",
                    "Nivea Luminous 630 Day Cream",
                    "Neue Derma Mopisturizer(occlusive)"
                ],
                "sunscreen": [
                    "Neutrogena Ultra Sheer SPF 50",
                    "Jenpharm spectrablock Sunblock ",
                ],
            },
            "evening": {
                "cleanser": [
                    "Garnier Bright Complete Facewash",
                    "Vince Vitamin C Face Wash",
                    "Conatural Rose Face Wash",
                    "Jenpharm MandelAC Face Wash",
                ],
                "serum": [
                    "Saeed Ghani Kojic Acid Serum",
                    "Bio-One Vitamin C Serum",
                    "Vince Skin Lightening Night Serum",
                    "AccuFix Alpha Arbutin Serum",
                ],
                "moisturiser": [
                    "Vince Skin Lightening Night Cream",
                    "Garnier Bright Complete Night Cream",
                    "Nivea Luminous 630 Night Cream",
                    "Neutrogena Rapid Tone Repair Night Cream",
                ],
            },
            "avoid": [
                "All sun exposure without high SPF",
                "Steroid or mercury-based whitening creams",
                "Skipping routine even one day",
            ],
            "tip": "Severe pigmentation or melasma needs professional treatment. Use this routine alongside dermatologist advice.",
            "see_doctor": True,
        },
    },

    # ══════════════════════════════════════════════════════════════
    "Dark circles": {

        "mild": {
            "morning": {
                "cleanser": [
                    "Cetaphil Gentle Foaming Cleanser",
                    "Conatural Rose Face Wash",
                    "Jenpharm Dermive Moisturizing Wash",
                ],
                "eye_cream": [
                    "Saeed Ghani Under Eye Cream",
                    "Neutrogena Rapid Dark Circle Repair Eye Cream",
                    "L'Oreal Eye Defense Cream",
                    "LOreal Paris - Revitalift 1.5% Hyaluronic Acid + 1% Caffeine Eye Serum"
                    "Vince Eye Serum",
                ],
                "moisturiser": [
                    "Nivea Soft Moisturizing Cream",
                    "Neutrogena Hydro Boost Water Gel",
                    "Neue Derma Moisturzier(occlusive)"
                ],
                "sunscreen": [
                    "Neue Derma Sunscreen spf 50"
                    "Neutrogena Ultra Sheer SPF 50",
                    "Jenpharm spectra bloack Sunblock ",
                ],
            },
            "evening": {
                "cleanser": [
                    "Cetaphil Gentle Foaming Cleanser",
                    "Conatural Rose Face Wash",
                    "Saeed Ghani Aloe Vera Face Wash",
                    "Jenpharm Dermive Moisturizing Wash",
                ],
                "eye_cream": [
                    "L'Oreal Eye Defense Cream",
                    "Saeed Ghani Under Eye Cream",
                    "Neutrogena Rapid Dark Circle Repair Eye Cream",
                    "Vince Eye Serum",
                ],
                "moisturiser": [
                    "Nivea Soft Moisturizing Cream",
                    "Neutrogena Hydro Boost Water Gel",
                    "Neue Derma Moisturzier(occlusive)"
                ],
            },
            "avoid": [
                "Rubbing eyes aggressively",
                "Late nights and excessive screen time",
                "Sleeping without removing makeup",
            ],
            "tip": (
                "Dark circles in Pakistan are often genetic or from sun exposure. "
                "Eye cream + SPF + adequate sleep is the best combination."
            ),
            "see_doctor": False,
        },

        "moderate": {
            "morning": {
                "cleanser": [
                    "Cetaphil Gentle Foaming Cleanser",
                    "Conatural Rose Face Wash",
                    "Jenpharm Dermive Moisturizing Wash",
                ],
                "eye_cream": [
                    "Saeed Ghani Under Eye Cream",
                    "Neutrogena Rapid Dark Circle Repair Eye Cream",
                    "L'Oreal Eye Defense Cream",
                    "LOreal Paris - Revitalift 1.5% Hyaluronic Acid + 1% Caffeine Eye Serum"
                    "Vince Eye Serum",
                ],
                "moisturiser": [
                    "Nivea Soft Moisturizing Cream",
                    "Neutrogena Hydro Boost Water Gel",
                    "Neue Derma Moisturzier(occlusive)"
                ],
               "sunscreen": [
                    "Neue Derma Sunscreen spf 50"
                    "Neutrogena Ultra Sheer SPF 50",
                    "Jenpharm spectra bloack Sunblock ",
                ],
            },
            "evening": {
                "cleanser": [
                    "Cetaphil Gentle Foaming Cleanser",
                    "Conatural Rose Face Wash",
                    "Saeed Ghani Aloe Vera Face Wash",
                    "Jenpharm Dermive Moisturizing Wash",
                ],
                "eye_cream": [
                    "L'Oreal Eye Defense Cream",
                    "Saeed Ghani Under Eye Cream",
                    "Neutrogena Rapid Dark Circle Repair Eye Cream",
                    "Vince Eye Serum",
                ],
                "moisturiser": [
                    "Nivea Soft Moisturizing Cream",
                    "Neutrogena Hydro Boost Water Gel",
                    "Neue Derma Moisturzier(occlusive)"
                ],
            },
            "avoid": [
                "Salty food and excessive caffeine — causes puffiness",
                "Sleeping on stomach — increases fluid under eyes",
                "Rubbing eyes",
            ],
            "tip": (
                "Cold compress on eyes for 5–10 minutes in the morning reduces puffiness. "
                "Vitamin C serum helps with pigmentation under eyes."
            ),
            "see_doctor": False,
        },

        "severe": {
            "morning": {
                "cleanser": [
                    "Cetaphil Gentle Foaming Cleanser",
                    "Conatural Rose Face Wash",
                    "Jenpharm Dermive Moisturizing Wash",
                ],
                "eye_cream": [
                    "Saeed Ghani Under Eye Cream",
                    "Neutrogena Rapid Dark Circle Repair Eye Cream",
                    "L'Oreal Eye Defense Cream",
                    "LOreal Paris - Revitalift 1.5% Hyaluronic Acid + 1% Caffeine Eye Serum"
                    "Vince Eye Serum",
                ],
                "moisturiser": [
                    "Nivea Soft Moisturizing Cream",
                    "Neutrogena Hydro Boost Water Gel",
                    "Neue Derma Moisturzier(occlusive)"
                ],
                "sunscreen": [
                    "Neue Derma Sunscreen spf 50"
                    "Neutrogena Ultra Sheer SPF 50",
                    "Jenpharm spectra bloack Sunblock ",
                ],
            },
            "evening": {
                "cleanser": [
                    "Cetaphil Gentle Foaming Cleanser",
                    "Conatural Rose Face Wash",
                    "Saeed Ghani Aloe Vera Face Wash",
                    "Jenpharm Dermive Moisturizing Wash",
                ],
                "eye_cream": [
                    "L'Oreal Eye Defense Cream",
                    "Saeed Ghani Under Eye Cream",
                    "Neutrogena Rapid Dark Circle Repair Eye Cream",
                    "Vince Eye Serum",
                ],
                "moisturiser": [
                    "Nivea Soft Moisturizing Cream",
                    "Neutrogena Hydro Boost Water Gel",
                    "Neue Derma Moisturzier(occlusive)"
                ],
            },
            "avoid": [
                "All sun exposure without SPF",
                "Alcohol and late nights",
            ],
            "tip": (
                "Severe dark circles often have a genetic component. "
                "Topical products help, but a dermatologist can offer professional treatments."
            ),
            "see_doctor": True,
        },
    },

    # ══════════════════════════════════════════════════════════════
    "dry": {

        "mild": {
            "morning": {
                "cleanser": [
                    "Cetaphil Gentle Foaming Cleanser",
                    "Conatural Rose Face Wash",
                    "Accufix Daily hydrating cleanser",
                    "Neutrogena Hydro Boost Gel cleanser"
                ],
                "serum": [
                    "The Ordinary Hyalauronic Acid Serum",
                    "Jenpharm Dermive Hydrating Serum",
                ],
                "moisturiser": [
                    "Nivea Soft Moisturizing Cream",
                    "CeraVe Moisturizing Cream",
                    "Conatural Aloe Vera Gel",
                    "Himalaya Nourishing Skin Cream",
                ],
                "sunscreen": [
                    "AccuFix Cosmetics Invisible Shield with Centella sunscreen",
                    "Sunplay SkinAqua Sunscreen SPF 50",
                    "Neutrogena Ultra Sheer SPF 50",

                ],
            },
            "evening": {
                "cleanser": [
                    "Cetaphil Gentle Foaming Cleanser",
                    "Conatural Rose Face Wash",
                    "Saeed Ghani Aloe Vera Face Wash",
                    "Himalaya Moisturizing Aloe Vera Face Wash",
                ],
                "serum": [
                    "The Ordinary Hyalauronic Acid Serum",
                    "Jenpharm Dermive Hydrating Serum",
                    "AccuFix Hydrating Serum",
                ],
                "moisturiser": [
                    "Nivea Soft Moisturizing Cream",
                    "CeraVe Moisturizing Cream",
                    "Jenpharm dermive oily moisturizer",
                    "Neue Derma Moisturizer(occlusive)"
                ],
            },
            "avoid": [
                "Foaming or gel cleansers — too stripping for dry skin",
                "Hot water when washing face",
                "Alcohol-based toners",
                "Skipping moisturiser",
            ],
            "tip": (
                "Pakistan's AC in summer and heating in winter both worsen dry skin. "
                "Apply moisturiser immediately after washing while skin is still damp."
            ),
            "see_doctor": False,
        },
 "moderate": {
            "morning": {
                "cleanser": [
                    "Cetaphil Gentle Foaming Cleanser",
                    "Conatural Rose Face Wash",
                    "Accufix Daily hydrating cleanser",
                    "Neutrogena Hydro Boost Gel cleanser"
                ],
                "serum": [
                    "The Ordinary Hyalauronic Acid Serum",
                    "Jenpharm Dermive Hydrating Serum",
                ],
                "moisturiser": [
                    "Nivea Soft Moisturizing Cream",
                    "CeraVe Moisturizing Cream",
                    "Conatural Aloe Vera Gel",
                    "Himalaya Nourishing Skin Cream",
                ],
                "sunscreen": [
                    "AccuFix Cosmetics Invisible Shield with Centella sunscreen",
                    "Sunplay SkinAqua Sunscreen SPF 50",
                    "Neutrogena Ultra Sheer SPF 50",

                ],
            },
            "evening": {
                "cleanser": [
                    "Cetaphil Gentle Foaming Cleanser",
                    "Conatural Rose Face Wash",
                    "Accufix Daily hydrating cleanser",
                    "Neutrogena Hydro Boost Gel cleanser"
                ],
                "serum": [
                    "The Ordinary Hyalauronic Acid Serum",
                    "Jenpharm Dermive Hydrating Serum",
                    "COSRX snail mocin 96%"
                ],
                "moisturiser": [
                    "Nivea Soft Moisturizing Cream",
                    "CeraVe Moisturizing Cream",
                    "Jenpharm dermive oily moisturizer",
                    "Neue Derma Moisturizer(occlusive)"
                ],
            },
            "avoid": [
                "Any product with alcohol high in the ingredient list",
                "Washing face more than twice a day",
                "Skipping moisturiser — ever",
                "Physical exfoliants like apricot scrubs",
            ],
            "tip": (
                "Moderate dry skin needs ceramide-based moisturisers to repair the skin barrier. "
                "CeraVe is ideal — available at Naheed and Fazal Din."
            ),
            "see_doctor": False,
        },

        "severe": {
            "morning": {
                "cleanser": [
                    "Cetaphil Gentle Foaming Cleanser",
                    "Jenpharm Dermive Moisturizing Wash",
                    "CeraVe Hydrating Cleanser",
                    "AccuFix Hydrating Gentle Daily Cleanser",
                ],
                "serum": [
                    "The Ordinary Hyalauronic Acid Serum",
                    "Jenpharm Dermive Hydrating Serum",
                    "DefyDerm Pure Hyaluronic Acid Serum "
                ],
                "moisturiser": [
                    "CeraVe Moisturizing Cream",
                    "Cetaphil Moisturizing Cream",
                    "Jenpharm Dermive oily Moisturizer ",
                    "Nivea Creme",
                ],
                "sunscreen": [
                    "U Veil SPF 60",
                    "Shade by ELIXIR SPF 50",
                    "CeraVe Hydrating Sunscreen SPF 50",
                    "Neutrogena Ultra Sheer SPF 50",
                ],
            },
            "evening": {
                "cleanser": [
                    "Cetaphil Gentle Foaming Cleanser",
                    "Jenpharm Dermive Moisturizing Wash",
                    "CeraVe Hydrating Cleanser",
                    "AccuFix Hydrating Gentle Daily Cleanser",
                ],
                "treatment": [
                    "CeraVe Healing Ointment",
                    "Saeed Ghani Hyaluronic Acid Serum",
                    "Vaseline Intensive Care Body Lotion (dry patches only)",
                    "AccuFix Hydrating Serum",
                ],
                "moisturiser": [
                    "CeraVe Moisturizing Cream",
                    "Cetaphil Moisturizing Cream",
                    "Nivea Creme",
                    "Jenpharm Dermive Moisturizing Cream",
                ],
            },
            "avoid": [
                "All drying products — foaming cleansers, AHAs, BHAs",
                "Hot showers",
                "Fragranced products",
            ],
            "tip": (
                "Severe dry skin may indicate eczema or a compromised skin barrier. "
                "See a dermatologist for a proper diagnosis and treatment plan."
            ),
            "see_doctor": True,
        },
    },

    # ══════════════════════════════════════════════════════════════
    "oily": {

        "mild": {
            "morning": {
                "cleanser": [
                    "Jenpharm MandelAC Face Wash",
                    "Conatural Tea Tree and Neem Acne Face Wash",
                ],
                "serum": [
                    "The Ordinary Niacinamide 10% + Zinc 1%",
                    "AccuFix Niacinamide Serum",
                    "Vince Niacinamide Serum",
                    "Seravio NZ SERUM"
                ],
                "moisturiser": [
                    "Neutrogena Hydro Boost Water Gel",
                    "Neue Derma Moisturizer(gel)",
                    "Jenpharm Dermive Oil Free Moisturizer",
                ],
                "sunscreen": [
                    "Jenpharm spectrablock Sunblock ",
                    "AccuFix Sunscreen SPF 50",
                    "Neutrogena Ultra Sheer SPF 50",
                ],
            },
            "evening": {
                "cleanser": [
                    "Jenpharm MandelAC Face Wash",
                    "Conatural Tea Tree and Neem Acne Face Wash",
                ],
                "serum": [
                    "The Ordinary Niacinamide 10% + Zinc 1%",
                    "AccuFix Niacinamide Serum",
                    "Vince Niacinamide Serum",
                    "Radiant Glow Niacinamide 15% Serum",
                ],
                "moisturiser": [
                    "Conatural Aloe Vera Gel",
                    "Neutrogena Hydro Boost Water Gel",
                    "Jenpharm Dermive Oil Free Moisturizer",
                    "Himalaya Light Moisturizer",
                ],
            },
            "avoid": [
                "Heavy creams and face oils",
                "Skipping moisturiser — makes skin produce more oil",
                "Washing face more than twice a day — strips skin",
            ],
            "tip": (
                "Oily skin still needs moisturiser — use a water-based gel. "
                "Niacinamide is the best ingredient for controlling sebum production."
            ),
            "see_doctor": False,
        },

        "moderate": {
            "morning": {
                "cleanser": [
                    "Jenpharm MandelAC Face Wash",
                    "Neutrogena Oil-Free Acne Wash",
                    "Conatural Tea Tree and Neem Acne Face Wash",
                    "AccuFix Hydrating Gentle Daily Cleanser",
                ],
                "serum": [
                    "The Ordinary Niacinamide 10% + Zinc 1%",
                    "AccuFix Niacinamide Serum",
                    "Jenpharm MandelAC Serum",
                    "Radiant Glow Niacinamide 15% Serum",
                ],
                "moisturiser": [
                    "Neutrogena Hydro Boost Water Gel",
                    "Jenpharm Dermive Oil Free Moisturizer",
                    "Conatural Aloe Vera Gel",
                    "CeraVe AM Facial Moisturizing Lotion",
                ],
                "sunscreen": [
                    "Jenpharm spectrablock Sunblock ",
                    "AccuFix Sunscreen SPF 50",
                    "Neutrogena Ultra Sheer SPF 50",
                ],
            },
            "evening": {
                "cleanser": [
                    "Jenpharm MandelAC Face Wash",
                    "Neutrogena Oil-Free Acne Wash",
                    "Conatural Tea Tree and Neem Acne Face Wash",
                    "The Body Shop Tea Tree Face Wash",
                ],
                "serum": [
                    "The Ordinary Niacinamide 10% + Zinc 1%",
                    "Jenpharm MandelAC Serum",
                    "AccuFix Niacinamide Serum",
                    "Vince Niacinamide Serum",
                ],
                "moisturiser": [
                    "Neutrogena Hydro Boost Water Gel",
                    "Jenpharm Dermive Oil Free Moisturizer",
                    "CeraVe PM Facial Moisturizing Lotion",
                    "Neue Derma Moistiurizer(gel)"
                ],
            },
            "avoid": [
                "Coconut oil, argan oil on face",
                "Heavy, non-comedogenic makeup",
                "Over-cleansing — more than twice daily",
            ],
            "tip": (
                "Pakistan's humid summers make oily skin worse. "
                "Use blotting papers during the day and a clay mask once a week to deep clean pores."
            ),
            "see_doctor": False,
        },

        "severe": {
            "morning": {
                "cleanser": [
                    "Jenpharm MandelAC Face Wash",
                    "Neutrogena Oil-Free Acne Wash",
                    "AccuFix Hydrating Gentle Daily Cleanser",
                    "Conatural Tea Tree and Neem Acne Face Wash",
                ],
                "treatment": [
                    "The Ordinary Niacinamide 10% + Zinc 1%",
                    "AccuFix Niacinamide Serum",
                    "Jenpharm MandelAC Serum",
                    "Conatural Niacinamide  Serum",
                ],
                "moisturiser": [
                    "Neutrogena Hydro Boost Water Gel",
                    "Jenpharm Dermive Oil Free Moisturizer",
                    "CeraVe AM Facial Moisturizing Lotion",
                    "Neue Derma Moistiurizer(gel)"
                ],
                "sunscreen": [
                    "Jenpharm spectramatt Sunblock SPF 40",
                    "Neutrogena Ultra Sheer SPF 50",
                    "MattShield Sebum Control Sunscreen"
                ],
            },
            "evening": {
                "cleanser": [
                    "Jenpharm MandelAC Face Wash",
                    "Neutrogena Oil-Free Acne Wash",
                    "AccuFix Hydrating Gentle Daily Cleanser",
                    "Conatural Tea Tree and Neem Acne Face Wash",
                ],
                "treatment": [
                    "Jenpharm MandelAC Serum",
                    "The Ordinary Salicylic Acid 2% Solution",
                    "AccuFix salicylic Acid serum",
                    "Vince Anti-Acne Night Serum",
                ],
                "moisturiser": [
                    "Neutrogena Hydro Boost Water Gel",
                    "Jenpharm Dermive Oil-Free Moisturizer",
                    "CeraVe AM Facial Moisturizing Lotion",
                    "Neue Derma Moistiurizer(gel)"
                ],
            },
            "avoid": [
                "All heavy oils and rich creams",
                "Skipping moisturiser",
                "Over-washing face",
            ],
            "tip": (
                "Severe oiliness combined with persistent breakouts may need medical treatment. "
                "A dermatologist can prescribe stronger actives."
            ),
            "see_doctor": True,
        },
    },

    # ══════════════════════════════════════════════════════════════
    "normal": {

        "mild": {
            "morning": {
                "cleanser": [
                    "Accufix Daily Hydrating Cleanser",
                    "Cerave Foaming Facial Cleanser",
                    "Conatural Rose Face Wash",
                    "JenPharm MAXDIF Facewash",
                    "Vince Vitamin C Face Wash",
                ],
                "serum": [
                    "Bio-One Vitamin C Serum",
                    "Vince Vitamin C Brightening Serum",
                    "Conatural Vitamin C Serum",
                    "The ordinry Ascorbyl Glucoside Solution 12%",
                ],
                "moisturiser": [
                    "Nivea Soft Moisturizing Cream",
                    "Neutrogena Hydro Boost Water Gel",
                    "Neue Derma Moisturzier(occlusive)"
                ],
                "sunscreen": [
                    "Neutrogena Ultra Sheer SPF 50",
                    "Jenpharm spectrablock Sunblock ",
                    "Neue Derma Sunscreen spf 50"
                ],
            },
            "evening": {
                "cleanser": [
                    "Accufix Daily Hydrating Cleanser",
                    "Cerave Foaming Facial Cleanser",
                    "Conatural Rose Face Wash",
                    "JenPharm MAXDIF Facewash",
                    "Vince Vitamin C Face Wash",
                ],
                "serum": [
                    "Bio-One Vitamin C Serum",
                    "Vince Vitamin C Brightening Serum",
                    "Conatural Vitamin C Serum",
                    "The ordinry Ascorbyl Glucoside Solution 12%",
                ],
                "moisturiser": [
                    "Nivea Soft Moisturizing Cream",
                    "Neutrogena Hydro Boost Water Gel",
                    "Neue Derma Moisturzier(occlusive)"
                ],
            },
            "avoid": [
                "Over-washing face",
                "Skipping SPF",
                "Using too many products at once",
            ],
            "tip": "Normal skin just needs consistency. A simple twice-daily routine is all you need to maintain healthy skin.",
            "see_doctor": False,
        },

        "moderate": {
            "morning": {
                "cleanser": [
                    "Conatural Rose Face Wash",
                    "Jenpharm MAXDIF Facewash",
                    "AccuFix Hydrating Gentle Daily Cleanser",
                    "Cetaphil Gentle Foaming Cleanser",
                ],
                "serum": [
                    "Bio-One Vitamin C Serum",
                    "AccuFix Glow Serum",
                    "Conatural Vitamin C Serum",
                    "Vince Vitamin C Brightening Serum",
                ],
                "moisturiser": [
                    "Neutrogena Hydro Boost Water Gel",
                    "CeraVe AM Facial Moisturizing Lotion",
                    "Nivea Soft Moisturizing Cream",
                    "Vince Whitening Moisturiser SPF 20",
                ],
                "sunscreen": [
                    "Shade by ELIXIR SPF 50",
                    "Neutrogena Ultra Sheer SPF 50",
                    "Garnier Bright Complete SPF 40",
                    "Jenpharm Sunblock SPF 50",
                ],
            },
            "evening": {
                "cleanser": [
                    "Conatural Rose Face Wash",
                    "Jenpharm MAXDIF Facewash",
                    "AccuFix Hydrating Gentle Daily Cleanser",
                    "Cetaphil Gentle Foaming Cleanser",
                    "Cetaphil Gentle skin Cleanser"
                ],
                "serum": [
                    "Bio-One Vitamin C Serum",
                    "AccuFix Glow Serum",
                    "Conatural Vitamin C Serum",
                    "Vince Vitamin C Brightening Serum",
                ],
                "moisturiser": [
                    "Neutrogena Hydro Boost Water Gel",
                    "CeraVe AM Facial Moisturizing Lotion",
                    "Nivea Soft Moisturizing Cream",
                    "Neue Derma Moisturizer(occlusive)",
                ],
            },
            "avoid": [
                "Skipping SPF",
                "Over-exfoliating",
            ],
            "tip": "Normal skin with seasonal changes needs slight adjustment — lighter products in summer, richer in winter.",
            "see_doctor": False,
        },

    },

    # ══════════════════════════════════════════════════════════════

"wrinkles/FINE LINES": {

        "mild": {
            "morning": {
                "cleanser": [
                    "Cetaphil Gentle Foaming Cleanser",
                    "Himalaya Moisturizing Aloe Vera Face Wash",
                    "Conatural Rose Face Wash",
                    "Jenpharm Dermive Moisturizing Wash",
                ],
                "serum": [
                    "Bio-One Vitamin C Serum",
                    "Conatural Vitamin C Serum",
                    "Vince Vitamin C Brightening Serum",
                    "AccuFix Glow Serum",
                ],
                "moisturiser": [
                    "Nivea Soft Moisturizing Cream",
                    "CeraVe Moisturizing Cream",
                    "Neutrogena Hydro Boost Water Gel",
                    "Himalaya Nourishing Skin Cream",
                ],
                "sunscreen": [
                    "Neutrogena Ultra Sheer SPF 50",
                    "Shade by ELIXIR SPF 50",
                    "Jenpharm Sunblock SPF 50",
                    "CeraVe Hydrating Sunscreen SPF 50",
                ],
            },
            "evening": {
                "cleanser": [
                    "Cetaphil Gentle Foaming Cleanser",
                    "Himalaya Moisturizing Aloe Vera Face Wash",
                    "Conatural Rose Face Wash",
                    "Jenpharm Dermive Moisturizing Wash",
                ],
                "serum": [
                    "Bio-One Vitamin C Serum",
                    "Saeed Ghani Hyaluronic Acid Serum",
                    "Conatural Vitamin C Serum",
                    "AccuFix Hydrating Serum",
                ],
                "moisturiser": [
                    "Nivea Soft Moisturizing Cream",
                    "CeraVe PM Facial Moisturizing Lotion",
                    "Himalaya Nourishing Skin Cream",
                    "Neutrogena Hydro Boost Water Gel",
                ],
            },
            "avoid": [
                "Sun exposure without SPF — #1 cause of premature ageing",
                "Skipping moisturiser",
                "Smoking",
            ],
            "tip": (
                "Pakistan's intense sun is the biggest cause of premature wrinkles. "
                "SPF 50 every morning is non-negotiable — even indoors near windows."
            ),
            "see_doctor": False,
        },

        "moderate": {
            "morning": {
                "cleanser": [
                    "Cetaphil Gentle Foaming Cleanser",
                    "Jenpharm Dermive Moisturizing Wash",
                    "Conatural Rose Face Wash",
                    "AccuFix Hydrating Gentle Daily Cleanser",
                ],
                "serum": [
                    "Bio-One Vitamin C Serum",
                    "AccuFix Glow Serum",
                    "Conatural Vitamin C Serum",
                    "Vince Vitamin C Brightening Serum",
                ],
                "moisturiser": [
                    "CeraVe Moisturizing Cream",
                    "Nivea Soft Moisturizing Cream",
                    "Neutrogena Hydro Boost Water Gel",
                    "Cetaphil Moisturizing Cream",
                ],
                "sunscreen": [
                    "Neutrogena Ultra Sheer SPF 50",
                    "Shade by ELIXIR SPF 50",
                    "CeraVe Hydrating Sunscreen SPF 50",
                    "Jenpharm Sunblock SPF 50",
                ],
            },
            "evening": {
                "cleanser": [
                    "Cetaphil Gentle Foaming Cleanser",
                    "Jenpharm Dermive Moisturizing Wash",
                    "Conatural Rose Face Wash",
                    "AccuFix Hydrating Gentle Daily Cleanser",
                ],
                "treatment": [
                    "Jenpharm MandelAC Serum",
                    "AccuFix Mandelic Acid Exfoliant",
                    "The Ordinary Lactic Acid 5% + HA",
                    "Bio-One Vitamin C Serum",
                ],
                "moisturiser": [
                    "CeraVe Moisturizing Cream",
                    "Cetaphil Moisturizing Cream",
                    "Nivea Creme",
                    "Neutrogena Hydro Boost Water Gel",
                ],
            },
            "avoid": [
                "Sun without SPF",
                "Dehydration — drink enough water",
                "Crash diets",
            ],
            "tip": (
                "Moderate wrinkles respond well to AHAs (mandelic/lactic acid) at night "
                "combined with Vitamin C in the morning. Be consistent for 12 weeks."
            ),
            "see_doctor": False,
        },

        "severe": {
            "morning": {
                "cleanser": [
                    "Cetaphil Gentle Foaming Cleanser",
                    "Jenpharm Dermive Moisturizing Wash",
                    "CeraVe Hydrating Cleanser",
                    "AccuFix Hydrating Gentle Daily Cleanser",
                ],
                "serum": [
                    "Bio-One Vitamin C Serum",
                    "AccuFix Glow Serum",
                    "Conatural Vitamin C Serum",
                    "Saeed Ghani Hyaluronic Acid Serum",
                ],
                "moisturiser": [
                    "CeraVe Moisturizing Cream",
                    "Cetaphil Moisturizing Cream",
                    "Nivea Creme",
                    "Jenpharm Dermive Moisturizing Cream",
                ],
                "sunscreen": [
                    "Neutrogena Ultra Sheer SPF 50",
                    "Shade by ELIXIR SPF 50",
                    "CeraVe Hydrating Sunscreen SPF 50",
                    "U Veil SPF 60",
                ],
            },
            "evening": {
                "cleanser": [
                    "Cetaphil Gentle Foaming Cleanser",
                    "Jenpharm Dermive Moisturizing Wash",
                    "CeraVe Hydrating Cleanser",
                    "AccuFix Hydrating Gentle Daily Cleanser",
                ],
                "treatment": [
                    "Jenpharm MandelAC Serum",
                    "AccuFix Mandelic Acid Exfoliant",
                    "The Ordinary Lactic Acid 5% + HA",
                    "Bio-One Vitamin C Serum",
                ],
                "moisturiser": [
                    "CeraVe Moisturizing Cream",
                    "Cetaphil Moisturizing Cream",
                    "Nivea Creme",
                    "Jenpharm Dermive Moisturizing Cream",
                ],
            },
            "avoid": [
                "Sun exposure without SPF — absolutely critical",
                "Smoking and alcohol",
                "Crash diets and extreme weight loss",
            ],
            "tip": (
                "Severe wrinkles and significant ageing benefit from professional "
                "dermatological treatments alongside a good home routine."
            ),
            "see_doctor": True,
        },
    },
}


# ─────────────────────────────────────────────────────────────────
# HELPERS
# ─────────────────────────────────────────────────────────────────

VALID_CONDITIONS = list(ROUTINES.keys())
CONFIDENCE_THRESHOLD = 0.50


def get_severity(confidence: float) -> str:
    """Map a confidence score to a severity tier."""
    if confidence >= 0.85:
        return "severe"
    elif confidence >= 0.65:
        return "moderate"
    else:
        return "mild"


def _pick_products(step_pool: dict) -> dict:
    """Randomly select one product per step from a pool dict."""
    return {step: random.choice(products) for step, products in step_pool.items()}


# ─────────────────────────────────────────────────────────────────
# MAIN ENGINE
# ─────────────────────────────────────────────────────────────────

def get_recommendation(
    condition: str,
    confidence: float,
    skin_type: Optional[str] = None,
) -> dict:
    """
    Return a personalised skincare routine for a detected condition.

    Parameters
    ----------
    condition   : Skin condition key matching ROUTINES (e.g. 'Acne', 'dry').
    confidence  : Model confidence score in [0.0, 1.0].
    skin_type   : Optional skin type label (informational only).

    Returns
    -------
    dict with keys:
        condition, confidence, severity, skin_type, is_uncertain,
        routine (or None), message, disclaimer
    """
    base = {
        "condition":  condition,
        "confidence": round(confidence, 3),
        "skin_type":  skin_type,
        "disclaimer": "Not a medical diagnosis. Consult a dermatologist for professional advice.",
    }

    # ── Low confidence ──────────────────────────────────────────
    if confidence < CONFIDENCE_THRESHOLD:
        return {
            **base,
            "severity":     None,
            "is_uncertain": True,
            "routine":      None,
            "message":      "Results unclear. Please consult a dermatologist.",
        }

    severity = get_severity(confidence)
    routine  = ROUTINES.get(condition, {}).get(severity)

    # ── Condition / severity not found ──────────────────────────
    if not routine:
        return {
            **base,
            "severity":     severity,
            "is_uncertain": False,
            "routine":      None,
            "message":      f"No routine available for '{condition}' ({severity}).",
        }

    # ── Build routine with random product picks ─────────────────
    return {
        **base,
        "severity":     severity,
        "is_uncertain": False,
        "message":      "Routine generated successfully.",
        "routine": {
            "morning":    _pick_products(routine["morning"]),
            "evening":    _pick_products(routine["evening"]),
            "avoid":      routine["avoid"],
            "tip":        routine["tip"],
            "see_doctor": routine["see_doctor"],
        },
    }


# ─────────────────────────────────────────────────────────────────
# PRETTY PRINTER
# ─────────────────────────────────────────────────────────────────

def print_result(result: dict) -> None:
    """Print a recommendation result in a readable format."""
    sep = "─" * 58

    print(f"\n  {sep}")
    print(f"  Condition  : {result['condition']}")
    print(f"  Severity   : {result['severity'] or 'N/A'}")
    print(f"  Confidence : {result['confidence'] * 100:.0f}%")
    if result["skin_type"]:
        print(f"  Skin Type  : {result['skin_type']}")

    if result["is_uncertain"]:
        print(f"\n  ⚠️  {result['message']}")
    elif result["routine"] is None:
        print(f"\n  ℹ️  {result['message']}")
    else:
        r = result["routine"]

        print(f"\n  🌅 Morning Routine:")
        for step, product in r["morning"].items():
            print(f"     {step:<14} →  {product}")

        print(f"\n  🌙 Evening Routine:")
        for step, product in r["evening"].items():
            print(f"     {step:<14} →  {product}")

        print(f"\n  ❌ Avoid:")
        for item in r["avoid"]:
            print(f"     • {item}")

        print(f"\n  💡 Tip: {r['tip']}")

        if r["see_doctor"]:
            print(f"\n  🏥 Please see a dermatologist for this condition.")

    print(f"  ⚕️  {result['disclaimer']}")
    print(f"  {sep}")


# ─────────────────────────────────────────────────────────────────
# TEST
# ─────────────────────────────────────────────────────────────────

def run_tests() -> None:
    print("\n" + "=" * 60)
    print("  DERMALYTIX — RECOMMENDATION ENGINE TEST")
    print("  Pakistani Products Edition")
    print("=" * 60)

    test_cases = [
        ("dark spots",    0.82, "oily"),
        ("Acne",          0.91, "oily"),
        ("dry",           0.67, "normal"),
        ("Dark circles",  0.72, "normal"),
        ("wrinkles",      0.55, None),
        ("oily",          0.45, None),        # Below threshold → uncertain
        ("normal",        0.88, "combination"),
    ]

    for condition, confidence, skin_type in test_cases:
        result = get_recommendation(condition, confidence, skin_type)
        print_result(result)

    print("\n" + "=" * 60)


if __name__ == "__main__":
    run_tests()

# ── CELL: Multi-condition merge engine ────────────────────

def merge_routines(conditions_with_confidence, skin_type=None):
    """
    Takes top predictions from model and merges into one routine.

    Args:
        conditions_with_confidence: list of dicts
            [
                {"condition": "Acne",         "confidence": 0.91},
                {"condition": "Dark circles",  "confidence": 0.72},
                {"condition": "oily",          "confidence": 0.68},
            ]
        skin_type: optional e.g. "oily", "dry"

    Returns:
        One merged routine with best products for all conditions
    """

    # Filter out uncertain conditions (below threshold)
    valid = [
        c for c in conditions_with_confidence
        if c["confidence"] >= CONFIDENCE_THRESHOLD
    ]

    if not valid:
        return {
            "conditions":   [],
            "is_uncertain": True,
            "routine":      None,
            "message":      "No conditions detected with enough confidence. Please consult a dermatologist.",
            "disclaimer":   "Not a medical diagnosis. Consult a dermatologist."
        }

    # Get individual routines for each valid condition
    individual_routines = []
    for item in valid:
        result = get_recommendation(
            condition   = item["condition"],
            confidence  = item["confidence"],
            skin_type   = skin_type
        )
        if result["routine"]:
            individual_routines.append({
                "condition":  item["condition"],
                "confidence": item["confidence"],
                "severity":   result["severity"],
                "routine":    result["routine"]
            })

    if not individual_routines:
        return {
            "conditions":   valid,
            "is_uncertain": False,
            "routine":      None,
            "message":      "Routines not available for detected conditions.",
            "disclaimer":   "Not a medical diagnosis. Consult a dermatologist."
        }

    # ── Merge strategy ──────────────────────────────────────
    # For each step (cleanser, serum etc.) collect all products
    # from all conditions, then pick the one that appears most
    # If tie → pick from highest confidence condition

    from collections import Counter

    def merge_step(step_name, time_of_day):
        """Collect all products for a step across all conditions."""
        all_products = []
        for r in individual_routines:
            routine_time = r["routine"].get(time_of_day, {})
            product = routine_time.get(step_name)
            if product:
                all_products.append((product, r["confidence"]))

        if not all_products:
            return None

        # Count frequency of each product
        product_counts = Counter(p for p, _ in all_products)
        max_count = max(product_counts.values())

        # Get products with highest frequency
        top_products = [p for p, c in product_counts.items() if c == max_count]

        # If tie — pick from highest confidence condition
        if len(top_products) > 1:
            for r in sorted(individual_routines, key=lambda x: x["confidence"], reverse=True):
                routine_time = r["routine"].get(time_of_day, {})
                product = routine_time.get(step_name)
                if product in top_products:
                    return product

        return top_products[0]

    # Get all step keys from morning and evening across all routines
    morning_steps = set()
    evening_steps = set()
    for r in individual_routines:
        morning_steps.update(r["routine"]["morning"].keys())
        evening_steps.update(r["routine"]["evening"].keys())

    # Build merged morning and evening
    merged_morning = {}
    for step in morning_steps:
        product = merge_step(step, "morning")
        if product:
            merged_morning[step] = product

    merged_evening = {}
    for step in evening_steps:
        product = merge_step(step, "evening")
        if product:
            merged_evening[step] = product

    # Merge avoid lists — combine all unique items
    all_avoids = []
    for r in individual_routines:
        for item in r["routine"]["avoid"]:
            if item not in all_avoids:
                all_avoids.append(item)

    # Merge tips — use tip from highest confidence condition
    primary = max(individual_routines, key=lambda x: x["confidence"])
    merged_tip = primary["routine"]["tip"]

    # see_doctor — True if ANY condition says True
    see_doctor = any(r["routine"]["see_doctor"] for r in individual_routines)

    return {
        "conditions": [
            {
                "condition":  r["condition"],
                "confidence": r["confidence"],
                "severity":   r["severity"]
            }
            for r in individual_routines
        ],
        "skin_type":    skin_type,
        "is_uncertain": False,
        "message":      "Merged routine generated successfully.",
        "routine": {
            "morning":    merged_morning,
            "evening":    merged_evening,
            "avoid":      all_avoids,
            "tip":        merged_tip,
            "see_doctor": see_doctor,
        },
        "disclaimer": "Not a medical diagnosis. Consult a dermatologist for professional advice."
    }


# ── Pretty printer for merged result ──────────────────────
def print_merged_result(result):
    print("\n" + "="*60)
    print("  DERMALYTIX — MULTI-CONDITION RESULT")
    print("="*60)

    if result["is_uncertain"]:
        print(f"\n  ⚠️  {result['message']}")
    else:
        print(f"\n  Detected conditions:")
        for c in result["conditions"]:
            print(f"    • {c['condition']:<20} {c['confidence']*100:.0f}%  ({c['severity']})")

        if result.get("skin_type"):
            print(f"  Skin type: {result['skin_type']}")

        r = result["routine"]
        print(f"\n  🌅 Morning Routine:")
        for step, product in r["morning"].items():
            print(f"     {step:<15} →  {product}")

        print(f"\n  🌙 Evening Routine:")
        for step, product in r["evening"].items():
            print(f"     {step:<15} →  {product}")

        print(f"\n  ❌ Avoid:")
        for item in r["avoid"]:
            print(f"     • {item}")

        print(f"\n  💡 Tip: {r['tip']}")

        if r["see_doctor"]:
            print(f"\n  🏥 Please consult a dermatologist!")

    print(f"\n  ⚕️  {result['disclaimer']}")
    print("="*60)


if __name__ == "__main__":
    print("Testing multi-condition merge engine...\n")
    result1 = merge_routines([
        {"condition": "Acne", "confidence": 0.91},
        {"condition": "Dark circles", "confidence": 0.72},
        {"condition": "oily", "confidence": 0.68},
    ], skin_type="oily")
    print("TEST 1 — Acne + Dark circles + Oily:")
    print_merged_result(result1)