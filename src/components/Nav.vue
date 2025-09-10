<template>
  <!-- Always show burger navigation -->
  <nav class="tufte-nav">
    <div 
      class="burger"
      :style="titleAlign && placement === 'top-right' && !isSticky ? { top: headingTop } : {}"
      :class="[
        { 'burger-expanded': mobileMenuOpen },
        { 'overflow-constrained': mobileMenuOpen && isOverflowing },
        { 'burger-sticky': isSticky && sticky },
        `burger-${placement}`
      ]"
    >
      <button 
        class="hamburger-button"
        @click="mobileMenuOpen = !mobileMenuOpen"
        :aria-expanded="mobileMenuOpen"
        aria-label="Toggle navigation menu"
      >
        <span class="hamburger-line" :class="{ 'hamburger-line-active': mobileMenuOpen }"></span>
        <span class="hamburger-line" :class="{ 'hamburger-line-active': mobileMenuOpen }"></span>
        <span class="hamburger-line" :class="{ 'hamburger-line-active': mobileMenuOpen }"></span>
      </button>

      <div class="burger-content" v-if="mobileMenuOpen">
        <slot />
        <a v-if="github" :href="github" target="_blank" rel="noopener noreferrer" class="github-link">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-label="GitHub">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
          </svg>
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'

interface Props {
  github?: string
  placement?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  sticky?: boolean
  titleAlign?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placement: 'top-right',
  sticky: false,
  titleAlign: false
})

const mobileMenuOpen = ref(false)
const isOverflowing = ref(false)
const isSticky = ref(false)
const headingTop = ref('4rem')
const headingTopPx = ref(60) // Store as number for scroll calculations

const checkOverflow = async () => {
  if (!mobileMenuOpen.value) {
    isOverflowing.value = false
    return
  }
  
  await nextTick()
  const burger = document.querySelector('.burger-expanded')
  if (burger) {
    const rect = burger.getBoundingClientRect()
    isOverflowing.value = rect.bottom > window.innerHeight || rect.top < 0
  }
}

const handleClickOutside = (event: Event) => {
  if (!mobileMenuOpen.value) return
  
  const burger = document.querySelector('.burger')
  const target = event.target as Node
  
  if (burger && !burger.contains(target)) {
    mobileMenuOpen.value = false
  }
}

const calculateHeadingPosition = () => {
  const firstHeading = document.querySelector('h1, h2, h3, h4, h5')
  if (firstHeading) {
    const rect = firstHeading.getBoundingClientRect()
    const topPosition = rect.top + window.scrollY
    headingTop.value = `${topPosition}px`
    headingTopPx.value = topPosition
  }
}

const handleScroll = () => {
  if (props.sticky) {
    const threshold = props.titleAlign ? Math.max(0, headingTopPx.value - 15) : 45
    const shouldBeSticky = window.scrollY >= threshold
    isSticky.value = shouldBeSticky
  }
}

watch(mobileMenuOpen, checkOverflow)

const handleResize = () => {
  calculateHeadingPosition()
  checkOverflow()
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  window.addEventListener('scroll', handleScroll)
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('touchstart', handleClickOutside)
  
  // Calculate heading position and set initial sticky state
  calculateHeadingPosition()
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('touchstart', handleClickOutside)
})
</script>

<style>
/* Base navigation styles */
.tufte-nav {
  font-size: 1.4rem;
  line-height: 1.6;
}

/* Burger navigation */
.tufte-nav .burger {
  position: fixed;
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid transparent;
  border-radius: 8px;
  background: #151515;
  overflow: hidden;
  z-index: 1000;
  transition: border-color 0.3s ease;
}

.tufte-nav .burger-top-right:not(.burger-sticky) {
  position: absolute;
  border-color: transparent;
}

.tufte-nav .burger-top-right.burger-sticky {
  position: fixed;
  border-color: white;
}

.tufte-nav .burger-expanded {
  border-color: white !important;
}

.tufte-nav .burger-expanded {
  width: fit-content;
  height: fit-content;
  min-width: 200px;
  max-width: 80vw;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.tufte-nav .burger-expanded.overflow-constrained {
  height: calc(100vh - 4rem);
  overflow-y: auto;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
}

/* Mobile-specific base constraint */
@media (max-width: 768px) {
  .tufte-nav .burger-expanded.overflow-constrained {
    height: calc(100vh - 8rem);
    max-height: calc(100vh - 8rem);
    box-sizing: border-box;
  }
}


/* Hide webkit scrollbar completely */
.tufte-nav .burger-expanded.overflow-constrained::-webkit-scrollbar {
  display: none;
}



/* Adjust constrained height and position */
.tufte-nav .burger-top-left.burger-expanded.overflow-constrained,
.tufte-nav .burger-top-right.burger-expanded.overflow-constrained {
  height: calc(100vh - 4rem);
}

.tufte-nav .burger-top-right.burger-sticky.burger-expanded.overflow-constrained {
  top: 1rem;
}

.tufte-nav .burger-bottom-left.burger-expanded.overflow-constrained,
.tufte-nav .burger-bottom-right.burger-expanded.overflow-constrained {
  height: calc(100vh - 4rem);
  bottom: 1rem;
  top: auto;
}

/* Mobile-specific constraints for dynamic viewport issues */
@media (max-width: 768px) {
  .tufte-nav .burger-top-left.burger-expanded.overflow-constrained,
  .tufte-nav .burger-top-right.burger-expanded.overflow-constrained {
    height: calc(100vh - 8rem);
    max-height: calc(100vh - 8rem);
    box-sizing: border-box;
  }

  .tufte-nav .burger-bottom-left.burger-expanded.overflow-constrained,
  .tufte-nav .burger-bottom-right.burger-expanded.overflow-constrained {
    height: calc(100vh - 8rem);
    max-height: calc(100vh - 8rem);
    box-sizing: border-box;
  }
}

/* Simple placement with ultra-wide constraints */
.tufte-nav .burger-top-left { 
  top: 1rem; 
  left: max(1rem, calc((100vw - 1400px) / 2)); 
}
.tufte-nav .burger-top-right { 
  top: 1rem; 
  right: max(1rem, calc((100vw - 1400px) / 2)); 
}

.tufte-nav .burger-top-right.burger-sticky {
  top: 1rem;
  right: max(1rem, calc((100vw - 1400px) / 2));
}
.tufte-nav .burger-bottom-left { 
  bottom: 1rem; 
  left: max(1rem, calc((100vw - 1400px) / 2)); 
}
.tufte-nav .burger-bottom-right { 
  bottom: 1rem; 
  right: max(1rem, calc((100vw - 1400px) / 2)); 
}

/* Hamburger button */
.tufte-nav .hamburger-button {
  position: absolute;
  top: 0;
  right: 0;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1001;
}

/* Move hamburger button to left for left-positioned burgers */
.tufte-nav .burger-top-left .hamburger-button,
.tufte-nav .burger-bottom-left .hamburger-button {
  right: auto;
  left: 0;
}

/* Move hamburger button to bottom for bottom-positioned burgers */
.tufte-nav .burger-bottom-left .hamburger-button,
.tufte-nav .burger-bottom-right .hamburger-button {
  top: auto;
  bottom: 0;
}

.tufte-nav .hamburger-line {
  width: 1.5rem;
  height: 2px;
  background-color: white;
  margin: 2px 0;
  transition: all 0.3s ease;
  transform-origin: center;
}

/* X animation */
.tufte-nav .hamburger-line:nth-child(1).hamburger-line-active {
  transform: translateY(6px) rotate(45deg);
}

.tufte-nav .hamburger-line:nth-child(2).hamburger-line-active {
  opacity: 0;
}

.tufte-nav .hamburger-line:nth-child(3).hamburger-line-active {
  transform: translateY(-6px) rotate(-45deg);
}

/* Burger menu content */
.tufte-nav .burger-content {
  padding: 3rem 1.5rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  white-space: nowrap;
}

.tufte-nav .burger-content .github-link {
  align-self: center;
}


/* New list-based structure for burger menu */
.tufte-nav .burger-content > ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.tufte-nav .burger-content ul li {
  margin: 0;
}

.tufte-nav .burger-content ul li::after {
  display: none;
}

.tufte-nav .burger-content ul > li > a {
  font-size: 1.4rem;
  padding: 0.3rem 0;
  text-decoration: none !important;
  color: white;
  border: none;
  display: block;
}

.tufte-nav .burger-content ul > li > a:hover {
  opacity: 0.7;
}

/* Use same recursive tree structure as dropdown - adapted for hamburger layout */
.tufte-nav .burger-content ul ul {
  display: block;
  list-style: none;
  margin: 0.5rem 0 0 1.5rem;
  padding: 0;
  position: relative;
}


/* All nested list items (same logic as dropdown) */
.tufte-nav .burger-content ul ul li {
  position: relative;
  margin: 0;
  padding: 0.2rem 0;
}

.tufte-nav .burger-content ul ul li::after {
  display: none;
}

/* Vertical line connecting items (same logic as dropdown) */
.tufte-nav .burger-content ul ul li:not(:last-child)::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  bottom: -0.2rem;
  width: 1px;
  background-color: #666;
  z-index: 1;
}

/* Parent items with children need longer connecting lines upward */
.tufte-nav .burger-content ul ul li:not(:last-child):has(ul)::before {
  top: -0.5rem;
}

/* All nested anchors (same logic as dropdown, different colors for hamburger) */
.tufte-nav .burger-content ul ul a {
  font-size: 1.2rem;
  padding: 0 0 0 1.5rem;
  text-decoration: none !important;
  color: #ccc;
  border: none;
  display: block;
  position: relative;
  z-index: 2;
}

.tufte-nav .burger-content ul ul a:hover {
  opacity: 0.7;
  color: white;
}

/* Horizontal line (branch) - same as dropdown */
.tufte-nav .burger-content ul ul a::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 12px;
  height: 1px;
  background-color: #666;
  z-index: 1;
}

/* Vertical line from top to middle - same as dropdown */
.tufte-nav .burger-content ul ul a::after {
  content: '';
  position: absolute;
  left: 0;
  top: -0.2rem;
  height: calc(50% + 0.2rem);
  width: 1px;
  background-color: #666;
  z-index: 1;
}

.tufte-nav .burger-content .github-link svg {
  width: 1.5em;
  height: 1.5em;
}

</style>