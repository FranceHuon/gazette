'use client'

import { css, Global } from '@emotion/react'

const accessibilityStyles = css`
  /* =====================================================
     RÈGLES DE BASE POUR LE FOCUS AU CLAVIER
     ===================================================== */
  
  /* 1. Masquer TOUS les contours par défaut */
  *:focus {
    outline: none !important;
  }

  /* 2. Effets subtils SEULEMENT lors de la navigation au clavier */
  *:focus-visible {
    box-shadow: 0 0 0 3px rgba(96, 108, 56, 0.3) !important;
    transform: scale(1.02) !important;
    transition: all 0.2s ease !important;
  }

  /* 3. Fallback pour les vieux navigateurs qui ne supportent pas focus-visible */
  .keyboard-user *:focus {
    box-shadow: 0 0 0 3px rgba(96, 108, 56, 0.3) !important;
    transform: scale(1.02) !important;
    transition: all 0.2s ease !important;
  }

  /* 4. Styles spécifiques pour les liens */
  a:focus-visible,
  .keyboard-user a:focus {
    background-color: rgba(96, 108, 56, 0.1) !important;
    border-radius: 4px !important;
    padding: 2px 4px !important;
    margin: -2px -4px !important;
    transform: none !important;
  }

  /* 5. Styles spécifiques pour les boutons */
  button:focus-visible,
  .keyboard-user button:focus {
    transform: translateY(-1px) !important;
    box-shadow: 0 4px 12px rgba(96, 108, 56, 0.3) !important;
  }

  /* =====================================================
     ADAPTATIONS POUR L'ACCESSIBILITÉ
     ===================================================== */

  /* 6. Mode sombre : utiliser un vert plus clair */
  @media (prefers-color-scheme: dark) {
    *:focus-visible,
    .keyboard-user *:focus {
      box-shadow: 0 0 0 3px rgba(163, 177, 138, 0.4) !important;
    }
    
    a:focus-visible,
    .keyboard-user a:focus {
      background-color: rgba(163, 177, 138, 0.15) !important;
    }
    
    button:focus-visible,
    .keyboard-user button:focus {
      box-shadow: 0 4px 12px rgba(163, 177, 138, 0.4) !important;
    }
  }

  /* 5. Mouvement réduit : désactiver les animations pour les personnes sensibles */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* =====================================================
     LIENS D'ÉVITEMENT (Skip Links)
     ===================================================== */

  /* 6. Style pour les liens "Aller au contenu principal" */
  .skip-link {
    position: absolute;
    top: -40px;              /* Caché par défaut */
    left: 6px;
    background: #606c38;     /* Votre couleur verte */
    color: white;
    padding: 8px;
    text-decoration: none;
    border-radius: 4px;
    font-weight: bold;
    z-index: 100;
    transition: top 0.3s;
  }

  /* 7. Afficher le skip link quand il a le focus */
  .skip-link:focus {
    top: 6px;               /* Devient visible */
  }

  /* =====================================================
     ÉLÉMENTS CACHÉS POUR LECTEURS D'ÉCRAN
     ===================================================== */

  /* 8. Classe pour cacher visuellement mais garder pour les lecteurs d'écran */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* 9. Rendre visible quand l'élément sr-only a le focus */
  .sr-only-focusable:focus {
    position: static;
    width: auto;
    height: auto;
    padding: inherit;
    margin: inherit;
    overflow: visible;
    clip: auto;
    white-space: normal;
  }
`

function AccessibilityStyles() {
  return <Global styles={accessibilityStyles} />
}

export default AccessibilityStyles
