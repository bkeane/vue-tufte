import { ref } from 'vue';
const marginNoteId = ref(`mn-${Math.random().toString(36).substr(2, 9)}`);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    for: (__VLS_ctx.marginNoteId),
    ...{ class: "margin-toggle" },
});
// @ts-ignore
[marginNoteId,];
__VLS_asFunctionalElement(__VLS_elements.input)({
    id: (__VLS_ctx.marginNoteId),
    ...{ class: "margin-toggle" },
    type: "checkbox",
});
// @ts-ignore
[marginNoteId,];
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "marginnote" },
});
var __VLS_0 = {};
/** @type {__VLS_StyleScopedClasses['margin-toggle']} */ ;
/** @type {__VLS_StyleScopedClasses['margin-toggle']} */ ;
/** @type {__VLS_StyleScopedClasses['marginnote']} */ ;
// @ts-ignore
var __VLS_1 = __VLS_0;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        marginNoteId: marginNoteId,
    }),
});
const __VLS_component = (await import('vue')).defineComponent({});
export default {};
; /* PartiallyEnd: #4569/main.vue */
