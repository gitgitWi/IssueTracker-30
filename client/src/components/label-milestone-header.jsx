import styled from "styled-components";

const StyledHeaderOne = (name, color) => styled.button`
    background-color: ${color === 1 ? `rgb(3, 102, 214)` : `rgb(255,255,255)`};
    color: ${color === 1 ? `rgb(255, 255, 255)` : `rgb(36, 41, 46)`};

    display: flex;
    justify-content: center;
    align-items: center;

    width: ${name === "Label" ? "100" : "125"}px;
    height: 32px;
    border: 0;
    border-radius: ${name === "Label" ? `5px 0 0 5px` : `0 5px 5px 0`};
    box-shadow: 0 0 2px 0 rgb(36, 41, 46);
       

    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
        sans-serif, Apple Color Emoji, Segoe UI Emoji;
    font-size: 13px;

    &:hover {
        cursor: pointer;
        background-color: ${color === 1
            ? `rgb(3, 102, 214)`
            : `rgb(236, 238, 240)`};
    }

    &:focus {
        outline: none;
    }
`;

export default StyledHeaderOne;
