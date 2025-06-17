function prefersReducedMotion() {
  if (window.matchMedia) {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  return false;
}

export function useDisableParallax() {
  const disableParallax = ref(false);
  onMounted(() => {
    disableParallax.value = prefersReducedMotion();
  });
  return disableParallax;
}
