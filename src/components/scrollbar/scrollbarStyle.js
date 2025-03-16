export const StyledRootScrollbar = ({ children }) => (
    <div
        style={{
            flexGrow: 1,
            height: '100%',
            overflow: 'hidden',
        }}
    >
        {children}
    </div>
);

export const StyledScrollbar = ({ children }) => (
    <div
        style={{
            maxHeight: '100%',
            overflowY: 'auto',
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(0, 0, 0, 0.48) transparent',
        }}
    >
        {children}
        <style>
            {`
          ::-webkit-scrollbar {
            width: 6px;
          }
          ::-webkit-scrollbar-track {
            background-color: transparent;
          }
          ::-webkit-scrollbar-thumb {
            background-color: rgba(0, 0, 0, 0.48);
          }
        `}
        </style>
    </div>
);