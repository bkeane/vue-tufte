<template>
  <!-- Single Nav element that handles both regular and sticky behavior -->
  <nav 
    class="tufte-nav" 
    :class="{
      'sticky-active': sticky && showStickyNav
    }"
    :data-sticky="sticky"
    :style="{
      '--delimiter': `'${delimiter}'`,
      position: sticky && showStickyNav ? 'fixed' : 'static',
      top: sticky && showStickyNav ? '1rem' : 'auto',
      right: sticky && showStickyNav ? '1rem' : 'auto',
      zIndex: sticky && showStickyNav ? '2000' : 'auto'
    }"
  >
    <!-- Standard Navigation -->
    <div 
      v-show="showNav"
      class="nav"
    >
      <div class="nav-content">
        <slot />
        <a v-if="github" :href="github" target="_blank" rel="noopener noreferrer" class="github-link">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-label="GitHub">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
          </svg>
        </a>
      </div>
    </div>

    <!-- Burger Navigation -->
    <div 
      v-show="showBurger"
      class="burger"
      :class="[
        { 'burger-expanded': mobileMenuOpen },
        { 'burger-inline': inline },
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

      <div class="burger-content" v-show="mobileMenuOpen">
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
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Props {
  delimiter?: string
  github?: string
  placement?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  inline?: boolean
  sticky?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  delimiter: ' · ',
  placement: 'top-right',
  sticky: false
})

const mobileMenuOpen = ref(false)

// Navigation state
const showStickyNav = ref(false)
const isMobileViewport = ref(false)

// Display logic: Nav shows when NOT mobile AND (NOT sticky OR NOT sticky-active)
const showNav = computed(() => {
  return !isMobileViewport.value && (!props.sticky || !showStickyNav.value)
})

// Display logic: Burger shows when mobile OR sticky-active  
const showBurger = computed(() => {
  return isMobileViewport.value || (props.sticky && showStickyNav.value)
})

const handleResize = () => {
  isMobileViewport.value = window.innerWidth <= 760
}

const handleScroll = () => {
  if (props.sticky) {
    const currentNav = document.querySelector(`[data-sticky="true"]`)
    
    if (currentNav && !showStickyNav.value) {
      // When not sticky, use the nav's current bottom position as reference
      const navBottom = currentNav.getBoundingClientRect().bottom + window.scrollY
      showStickyNav.value = window.scrollY > navBottom
    } else if (showStickyNav.value) {
      // When sticky, check if we should hide it by scrolling back to top
      const approximateHeaderHeight = 150
      showStickyNav.value = window.scrollY > approximateHeaderHeight
    }
  }
}

onMounted(() => {
  // Initialize viewport detection
  handleResize()
  window.addEventListener('resize', handleResize)
  
  if (props.sticky) {
    window.addEventListener('scroll', handleScroll)
    handleScroll()
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (props.sticky) {
    window.removeEventListener('scroll', handleScroll)
  }
})
</script>

<style>
/* Base navigation styles */
.tufte-nav {
  font-size: 1.4rem;
  line-height: 1.6;
}

/* Standard navigation */
.nav {
  display: contents;
}

.nav-content {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

/* Backward compatibility: direct anchor children (old flat structure) */
.tufte-nav .nav-content > a {
  text-decoration: none !important;
  color: inherit;
  margin-right: 1rem;
}

.tufte-nav .nav-content > a:hover {
  opacity: 0.7;
}

.tufte-nav .nav-content > a:not(:last-child)::after {
  content: var(--delimiter);
  margin-left: 0.5rem;
  color: inherit;
}

/* New list-based structure */
.tufte-nav .nav-content > ul {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
}

.tufte-nav .nav-content > ul > li {
  position: relative;
  display: flex;
  align-items: center;
}

.tufte-nav .nav-content > ul > li > a {
  text-decoration: none !important;
  color: inherit;
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
}

.tufte-nav .nav-content > ul > li > a:hover {
  opacity: 0.7;
}

.tufte-nav .nav-content > ul > li:not(:last-child)::after {
  content: var(--delimiter);
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  color: inherit;
}


/* Dropdown shows entire tree structure on first hover */
.tufte-nav .nav-content ul ul {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background: #151515;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  list-style: none;
  margin: 0;
  padding: 0.5rem 0 0.5rem 1.5rem;
  min-width: 150px;
  z-index: 1000;
}

/* Show dropdown on hover of first level item */
.tufte-nav .nav-content li:hover > ul {
  display: block;
}

/* All nested levels within dropdown are always visible */
.tufte-nav .nav-content ul ul ul {
  display: block;
  position: static;
  background: none;
  box-shadow: none;
  margin: 0.5rem 0 0 1.5rem;
  padding: 0;
}

/* Children of non-last parents should draw continuation line for their parent's connection */
.tufte-nav .nav-content ul ul li:not(:last-child) > ul::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 1px;
  background-color: #666;
  z-index: 1;
}

/* All nested list items */
.tufte-nav .nav-content ul ul li {
  position: relative;
  margin: 0;
  padding: 0.2rem 0;
}

.tufte-nav .nav-content ul ul li::after {
  display: none;
}

/* Vertical line connecting all items except stops at last item - works at any level */
.tufte-nav .nav-content ul ul li:not(:last-child)::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  bottom: -0.2rem;
  width: 1px;
  background-color: #666;
  z-index: 1;
}

/* All nested anchors */
.tufte-nav .nav-content ul ul a {
  font-size: 1.2rem;
  padding: 0 0 0 1.5rem;
  text-decoration: none !important;
  color: #ccc;
  display: block;
  white-space: nowrap;
  position: relative;
  z-index: 2;
}

.tufte-nav .nav-content ul ul a:hover {
  opacity: 0.7;
  color: white;
}

/* Horizontal line (branch) - works at any level */
.tufte-nav .nav-content ul ul a::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 12px;
  height: 1px;
  background-color: #666;
  z-index: 1;
}

/* Vertical line from top to middle for non-last items - works at any level */
.tufte-nav .nav-content ul ul li:not(:last-child) a::after {
  content: '';
  position: absolute;
  left: 0;
  top: -0.2rem;
  height: calc(50% + 0.2rem);
  width: 1px;
  background-color: #666;
  z-index: 1;
}

/* Vertical line from top to middle for last item (shorter) - works at any level */
.tufte-nav .nav-content ul ul li:last-child a::after {
  content: '';
  position: absolute;
  left: 0;
  top: -0.2rem;
  height: calc(50% + 0.2rem);
  width: 1px;
  background-color: #666;
  z-index: 1;
}

.tufte-nav .nav .github-link {
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
}

.tufte-nav .nav .github-link::before {
  content: var(--delimiter);
  margin-right: 0.5rem;
  color: inherit;
}

.tufte-nav .nav .github-link svg {
  width: 1.15em;
  height: 1.15em;
}

/* Burger navigation */
.tufte-nav .burger {
  position: fixed;
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid white;
  border-radius: 8px;
  background: #151515;
  transition: all 0.4s ease;
  overflow: hidden;
  z-index: 1000;
}

.tufte-nav .burger-expanded {
  width: fit-content;
  height: fit-content;
  min-width: 200px;
  max-width: 80vw;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
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

/* Backward compatibility: direct anchor children (old flat structure) */
.tufte-nav .burger-content > a {
  font-size: 1.4rem;
  padding: 0.3rem 0;
  margin-right: 0 !important;
  text-decoration: none !important;
  color: white;
  border: none;
}

.tufte-nav .burger-content > a:hover {
  opacity: 0.7;
}

.tufte-nav .burger-content > a:not(:last-child)::after {
  display: none;
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

/* All responsive behavior now handled by JavaScript v-show directives */
</style>