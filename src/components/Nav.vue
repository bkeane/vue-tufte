<template>
  <nav 
    v-show="!sticky || showStickyNav"
    class="tufte-nav" 
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
      <slot />
      <a v-if="github" :href="github" target="_blank" rel="noopener noreferrer" class="github-link">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-label="GitHub">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
        </svg>
      </a>
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

// Display logic: Nav shows when NOT mobile AND NOT sticky-active
const showNav = computed(() => {
  console.log('🖥️ Nav logic:', {
    isMobile: isMobileViewport.value,
    isSticky: props.sticky,
    stickyActive: showStickyNav.value,
    shouldShow: !isMobileViewport.value && !(props.sticky && showStickyNav.value)
  })
  return !isMobileViewport.value && !(props.sticky && showStickyNav.value)
})

// Display logic: Burger shows when mobile OR sticky-active  
const showBurger = computed(() => {
  console.log('🍔 Burger logic:', {
    isMobile: isMobileViewport.value,
    isSticky: props.sticky,
    stickyActive: showStickyNav.value,
    shouldShow: isMobileViewport.value || (props.sticky && showStickyNav.value)
  })
  return isMobileViewport.value || (props.sticky && showStickyNav.value)
})

const handleResize = () => {
  const wasMobile = isMobileViewport.value
  isMobileViewport.value = window.innerWidth <= 760
  
  if (wasMobile !== isMobileViewport.value) {
    console.log('📱 Viewport changed:', isMobileViewport.value ? 'MOBILE' : 'DESKTOP')
  }
}

const handleScroll = () => {
  if (props.sticky) {
    console.log('🔍 Scroll handler running for sticky nav')
    
    // Find all Nav components in the DOM
    const allNavs = document.querySelectorAll('.tufte-nav')
    console.log('📱 Found navs:', allNavs.length)
    
    const currentNav = document.querySelector(`[data-sticky="${props.sticky}"]`)
    console.log('🎯 Current sticky nav:', currentNav)
    
    // Find the first non-sticky nav (header nav) to use as reference
    const referenceNav = Array.from(allNavs).find(nav => !nav.hasAttribute('data-sticky') || nav.getAttribute('data-sticky') === 'false')
    console.log('📍 Reference nav found:', referenceNav)
    
    // Only show sticky nav if we have a reference nav and it's scrolled out of view
    if (referenceNav) {
      const headerBottom = referenceNav.getBoundingClientRect().bottom + window.scrollY
      const currentScroll = window.scrollY
      console.log('📏 Header bottom:', headerBottom, 'Current scroll:', currentScroll)
      console.log('🔄 Should show sticky?', currentScroll > headerBottom)
      
      const oldValue = showStickyNav.value
      showStickyNav.value = window.scrollY > headerBottom
      
      if (oldValue !== showStickyNav.value) {
        console.log('🎉 Sticky nav visibility changed:', showStickyNav.value ? 'SHOWING' : 'HIDING')
      }
    } else {
      console.log('❌ No reference nav found')
    }
  }
}

onMounted(() => {
  console.log('🚀 Nav component mounted - sticky:', props.sticky)
  
  // Initialize viewport detection
  handleResize()
  window.addEventListener('resize', handleResize)
  console.log('📱 Resize listener added')
  
  if (props.sticky) {
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    console.log('✅ Scroll listener added for sticky nav')
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

.tufte-nav .nav a {
  text-decoration: none !important;
  color: inherit;
  margin-right: 1rem;
}

.tufte-nav .nav a:hover {
  opacity: 0.7;
}

.tufte-nav .nav a:not(:last-child)::after {
  content: var(--delimiter);
  margin-left: 0.5rem;
  color: inherit;
}

.tufte-nav .nav .github-link {
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
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
  background: #111;
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

.tufte-nav .burger-content a {
  font-size: 1.4rem;
  padding: 0.3rem 0;
  margin-right: 0 !important;
  text-decoration: none !important;
  color: white;
  border: none;
}

.tufte-nav .burger-content .github-link svg {
  width: 1.5em;
  height: 1.5em;
}

.tufte-nav .burger-content a:hover {
  opacity: 0.7;
}

.tufte-nav .burger-content a:not(:last-child)::after {
  display: none;
}

/* All responsive behavior now handled by JavaScript v-show directives */
</style>