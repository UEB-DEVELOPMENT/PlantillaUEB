declare module 'jsvectormap' {
    const jsVectorMap: new (options: Record<string, unknown>) => {
        destroy: () => void;
        updateSize: () => void;
    };
    export default jsVectorMap;
}
