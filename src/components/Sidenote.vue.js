import { ref, getCurrentInstance, onMounted } from 'vue';
const sidenoteId = ref(`sn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
// Validate proper usage context
onMounted(() => {
    const instance = getCurrentInstance();
    const parentElement = instance?.vnode?.el?.parentElement;
    if (parentElement) {
        const validBlockElements = ['P', 'DIV', 'SECTION', 'ARTICLE', 'BLOCKQUOTE', 'MAIN', 'ASIDE'];
        const isInValidContext = validBlockElements.includes(parentElement.tagName);
        if (!isInValidContext) {
            console.error(`❌ Sidenote must be used within block elements (${validBlockElements.map(t => t.toLowerCase()).join(', ')}) for proper positioning. ` +
                `Currently in: ${parentElement.tagName.toLowerCase()}. Layout will not work correctly.`);
        }
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    for: (__VLS_ctx.sidenoteId),
    ...{ class: "margin-toggle sidenote-number" },
});
// @ts-ignore
[sidenoteId,];
__VLS_asFunctionalElement(__VLS_elements.input)({
    id: (__VLS_ctx.sidenoteId),
    ...{ class: "margin-toggle" },
    type: "checkbox",
});
// @ts-ignore
[sidenoteId,];
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "sidenote" },
});
var __VLS_0 = {};
/** @type {__VLS_StyleScopedClasses['margin-toggle']} */ ;
/** @type {__VLS_StyleScopedClasses['sidenote-number']} */ ;
/** @type {__VLS_StyleScopedClasses['margin-toggle']} */ ;
/** @type {__VLS_StyleScopedClasses['sidenote']} */ ;
// @ts-ignore
var __VLS_1 = __VLS_0;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        sidenoteId: sidenoteId,
    }),
});
const __VLS_component = (await import('vue')).defineComponent({});
export default {};
; /* PartiallyEnd: #4569/main.vue */
