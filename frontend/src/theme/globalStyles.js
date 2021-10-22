const globalStyles = `
    * {
        padding: 0;
        margin: 0;
        font-family: "Heebo";
    }

    html,
    body,
    #root {
        height: 100%;
        overflow-x: hidden;
    }

    html {
        scroll-behavior: smooth;
        font-size: 62.5%;
    }

    body {
        font-size: 1.8rem;
        background: white;
    }

    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-track {
        background: #e5e4e494;
        border-radius: 20px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #265fb1d4;
        border-radius: 20px;
    }

    /* Remove Input type number arrows */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Remove Input type number arrows - Firefox */
    input[type="number"] {
        -moz-appearance: textfield;
    }

    /* Remove the default autofill background inside inputs */
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
        -webkit-box-shadow: 0 0 0 30px white inset !important;
    }
`;
export default globalStyles;
