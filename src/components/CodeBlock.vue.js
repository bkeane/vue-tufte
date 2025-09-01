import { ref, onMounted, watch } from 'vue';
import { getGlobalHighlighter } from '../index';
const props = withDefaults(defineProps(), {
    language: 'text',
    theme: 'nord'
});
const slots = defineSlots();
const highlightedCode = ref('');
async function highlightCode() {
    const slotContent = slots.default?.();
    if (!slotContent || slotContent.length === 0) {
        return;
    }
    // Extract text content while preserving whitespace
    let code = '';
    if (typeof slotContent[0].children === 'string') {
        code = slotContent[0].children;
    }
    else if (Array.isArray(slotContent[0].children)) {
        code = slotContent[0].children.join('');
    }
    else {
        code = slotContent[0].children?.toString() || '';
    }
    if (!code.trim()) {
        return;
    }
    const hl = await getGlobalHighlighter();
    // Helper function to attempt highlighting with dynamic loading
    const attemptHighlight = async () => {
        try {
            return hl.codeToHtml(code, {
                lang: props.language,
                theme: props.theme
            });
        }
        catch (error) {
            const errorMessage = error?.message || '';
            // Check if it's a language error
            if (errorMessage.includes('Language') && errorMessage.includes('not found')) {
                await hl.loadLanguage(props.language);
                // Retry after loading language
                return attemptHighlight();
            }
            // Check if it's a theme error
            if (errorMessage.includes('Theme') && errorMessage.includes('not found')) {
                await hl.loadTheme(props.theme);
                // Retry after loading theme
                return attemptHighlight();
            }
            // Re-throw if it's not a loading issue we can handle
            throw error;
        }
    };
    try {
        const html = await attemptHighlight();
        // Get theme background color after ensuring theme is loaded
        const themeInfo = hl.getTheme(props.theme);
        const bgColor = themeInfo?.bg || '#ffffff';
        // Force the background color by modifying the HTML
        const modifiedHtml = html.replace(/style="([^"]*)"/, `style="$1; background-color: ${bgColor} !important;"`);
        highlightedCode.value = modifiedHtml;
    }
    catch (error) {
        console.warn(`VueTufte: Failed to highlight ${props.language}/${props.theme}`, error?.message || error);
        // Fallback to plain text rendering
    }
}
onMounted(highlightCode);
watch(() => [props.language, props.theme], highlightCode);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_withDefaultsArg = (function (t) { return t; })({
    language: 'text',
    theme: 'nord'
});
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
if (__VLS_ctx.highlightedCode) {
    // @ts-ignore
    [highlightedCode,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "shiki-wrapper" },
    });
    __VLS_asFunctionalDirective(__VLS_directives.vHtml)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.highlightedCode) }, null, null);
    // @ts-ignore
    [highlightedCode, vHtml,];
}
else {
    __VLS_asFunctionalElement(__VLS_elements.pre, __VLS_elements.pre)({});
    __VLS_asFunctionalElement(__VLS_elements.code, __VLS_elements.code)({});
    __VLS_asFunctionalSlot(slots['default'])({});
}
/** @type {__VLS_StyleScopedClasses['shiki-wrapper']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        highlightedCode: highlightedCode,
    }),
    __typeProps: {},
    props: {},
});
const __VLS_component = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
export default {};
; /* PartiallyEnd: #4569/main.vue */
