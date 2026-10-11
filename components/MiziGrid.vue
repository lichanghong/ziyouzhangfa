<template>
  <div class="grid-cell">
    <svg class="mizige" viewBox="0 0 100 100" aria-hidden="true">
      <rect x="1.5" y="1.5" width="97" height="97" fill="none" stroke="#D0918F" stroke-width="3" />
      <line x1="50" y1="0" x2="50" y2="100" stroke="#D0918F" stroke-width="1.5" stroke-dasharray="4 3" opacity=".9" />
      <line x1="0" y1="50" x2="100" y2="50" stroke="#D0918F" stroke-width="1.5" stroke-dasharray="4 3" opacity=".9" />
      <line x1="0" y1="0" x2="100" y2="100" stroke="#D0918F" stroke-width="1.5" stroke-dasharray="4 3" opacity=".9" />
      <line x1="100" y1="0" x2="0" y2="100" stroke="#D0918F" stroke-width="1.5" stroke-dasharray="4 3" opacity=".9" />
    </svg>
    <slot />
  </div>
</template>
