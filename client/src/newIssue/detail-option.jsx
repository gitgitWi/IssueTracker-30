import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import DetailDropdown from "./detail-option-dropdown.jsx";

import host from "../../config.js";

const StyledOption = styled.div`
    border-bottom: 1px solid lightgray;
    margin-bottom: 10%;
    height: auto;
    min-height: 20%;
`;

const StyledOptionDiv = styled.div`
    background-color: transparent;
    color: #586069;
    svg {
        position: absolute;
        right: 1%;
        fill: currentColor;
    }
    &:hover {
        color: #2188ff;

        svg {
            fill: #2188ff;
        }
    }
`;

const StyledOptionDesDiv = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledOptionMessage = styled.div`
    display: ${props => props.data.size === 0 || props.data.length === 0 ? "block" : "none"};
    margin-top: 11%;
`

const StyledOptionDesInnerDiv = styled.div`
    display: flex;
    margin: 0.5% 0%;
`;

const StyledOptionImg = styled.img`
    width: 20px;
    height: 20px;
    border: 1px solid lightgray;
    border-radius: 3px;
`;

const StyledOptionTag = styled.div`
    background-color: ${(props) => props.bgColor};
    color: white;
    text-shadow: 1px 1px 3px black;
    padding: 1% 1% 1% 2%;
    margin: 1% 0%;
    border-radius: 3px;
`;

const StyledOptionDes = styled.p`
    margin: 0% 0% 0% 3%;
    color: black;
`;

const StyledMilestoneDiv = styled.div`
    background-color: white;
`;

const StyledProgressBar = styled.progress`
    width:100%;
    display: ${(props) => (props.data ? "block" : "none")};
`;

const detailOption = (props) => {
    const [dropDown, setDropDown] = useState(false);
    const detailOptionClick = (e) => {
        e.preventDefault();
        setDropDown(!dropDown);
    };
    const liData = [];
    switch (props.name) {
        case "Assignee":
            const usersData = JSON.parse(localStorage.getItem("usersData"));
            usersData?.forEach((ele) => {
                liData.push({
                    key: ele.userId,
                    value: ele.userId,
                    media: ele.imageURL,
                });
            });
            break;
        case "Label":
            const labelsData = JSON.parse(localStorage.getItem("labelsData"));
            labelsData?.forEach((ele) => {
                liData.push({
                    key: ele.ID,
                    value: ele.content,
                    media: ele.color,
                });
            });
            break;
        case "Milestone":
            const milestonesData = JSON.parse(
                localStorage.getItem("milestonesData")
            );
            milestonesData?.forEach((ele) => {
                liData.push({ key: ele.ID, value: ele.title });
            });
            break;
    }

    const handleClick = async (e) => {
        const axiosFunc = (data, localStorageData) => {
            axios({
                method: "PUT",
                url: `http://${host}:3000/issue`,
                data: data,
                withCredentials: true,
            }).then(res => {
                const tempLocalStorage = JSON.parse(localStorage.issueData);
                if (props.name === 'Assignee') {
                    tempLocalStorage[tempLocalStorage.findIndex((v) => v.issueId === props.issueId)].assignId = localStorageData.data;
                } else if (props.name === 'Label') {
                    tempLocalStorage[tempLocalStorage.findIndex((v) => v.issueId === props.issueId)].labelContent = localStorageData.contentArr;
                    tempLocalStorage[tempLocalStorage.findIndex((v) => v.issueId === props.issueId)].labelId = localStorageData.data;
                } else if (props.name === 'Milestone') {
                    tempLocalStorage[tempLocalStorage.findIndex((v) => v.issueId === props.issueId)].milestoneId = localStorageData.id;
                    tempLocalStorage[tempLocalStorage.findIndex((v) => v.issueId === props.issueId)].milestoneTitle = localStorageData.title;
                }
                localStorage.setItem(
                    "issueData",
                    JSON.stringify(tempLocalStorage)
                );
            });
        }

        switch (props.name) {
            case "Assignee": {
                const temp = new Set();

                for (let item of props.data) {
                    temp.add(item);
                }
                
                let assignee = e.currentTarget.innerText;

                if (assignee === "Assign yourself") {
                    assignee = localStorage.getItem("userId");
                }

                if (temp.has(assignee)) {
                    temp.delete(assignee);
                } else {
                    temp.add(assignee);
                }
                const data = [];
                temp.forEach((assingId) => {
                    data.push(assingId);
                });
                axiosFunc({
                    mode: 5,
                    issueId: props.issueId,
                    assignId: data,
                }, { data: data })
                props.setData(temp);
                break;
            }
            case "Label": {
                let temp = new Set();
                for (let item of props.data) {
                    temp.add({ id: item.id, content: item.content });
                }
                const tempArr = [...temp];
                const tempInd = tempArr.findIndex((label) => label.id === +(e.currentTarget.getAttribute("id").split("_")[1]));
                if (tempInd > -1) {
                    tempArr.splice(tempInd, 1);
                    temp = new Set(tempArr);
                } else {
                    temp.add({
                        id: Number(e.currentTarget.getAttribute("id").split("_")[1]),
                        content: e.currentTarget.innerText,
                    });
                }
                const data = [];
                const contentArr = [];
                temp.forEach((label) => {
                    data.push(label.id);
                    contentArr.push(label.content);
                });
                axiosFunc({
                    mode: 6,
                    issueId: props.issueId,
                    labelId: data,
                }, { contentArr: contentArr, data: data });
                props.setData(temp);
                break;
            }
            case "Milestone":
                if (props.data.id === +e.currentTarget.getAttribute("id").split("_")[1]) {
                    axiosFunc({
                        mode: 3,
                        issueId: props.issueId,
                        milestoneId: null,
                    }, { id: '', title: '' })
                    props.setData({
                        id: null,
                        value: null,
                    });
                    break;
                }
                axiosFunc({
                    mode: 3,
                    issueId: props.issueId,
                    milestoneId: +e.currentTarget.getAttribute("id").split("_")[1],
                }, { id: +e.currentTarget.getAttribute("id").split("_")[1], title: e.currentTarget.innerText })
                props.setData({
                    id: e.currentTarget.getAttribute("id").split("_")[1],
                    value: e.currentTarget.innerText,
                });
                break;
        }
    };

    const urlData = [];
    const colorData = [];
    let open = 0;
    let close = 0;

    switch (props.name) {
        case "Assignee":
            if (props.data.size > 0) {
                const usersData = JSON.parse(localStorage.getItem("usersData"));
                for (const item of props.data) {
                    urlData.push(
                        usersData.filter((data) => data.userId === item)[0]
                    );
                }
            }
            break;
        case "Label":
            if (props.data.size > 0) {
                for (const item of props.data) {
                    colorData.push(
                        liData.filter((data) => data.value === item.content)[0]
                    );
                }
            }
            break;
        case "Milestone":
            open = 0;
            close = 0;

            const issueData = JSON.parse(localStorage.getItem("issueData"));
            if (props.data) {
                issueData.forEach((element) => {
                    if (Number(props.data.id) === element.milestoneId) {
                        element.status === 0 ? close++ : open++;
                    }
                });
            }
            break;
    }

    return (
        <StyledOption>
            <StyledOptionDiv onClick={detailOptionClick}>
                {props.name}
                <svg
                    viewBox="0 0 16 16"
                    version="1.1"
                    width="16"
                    height="16"
                    aria-hidden="true"
                >
                    <path d="M7.429 1.525a6.593 6.593 0 011.142 0c.036.003.108.036.137.146l.289 1.105c.147.56.55.967.997 1.189.174.086.341.183.501.29.417.278.97.423 1.53.27l1.102-.303c.11-.03.175.016.195.046.219.31.41.641.573.989.014.031.022.11-.059.19l-.815.806c-.411.406-.562.957-.53 1.456a4.588 4.588 0 010 .582c-.032.499.119 1.05.53 1.456l.815.806c.08.08.073.159.059.19a6.494 6.494 0 01-.573.99c-.02.029-.086.074-.195.045l-1.103-.303c-.559-.153-1.112-.008-1.529.27-.16.107-.327.204-.5.29-.449.222-.851.628-.998 1.189l-.289 1.105c-.029.11-.101.143-.137.146a6.613 6.613 0 01-1.142 0c-.036-.003-.108-.037-.137-.146l-.289-1.105c-.147-.56-.55-.967-.997-1.189a4.502 4.502 0 01-.501-.29c-.417-.278-.97-.423-1.53-.27l-1.102.303c-.11.03-.175-.016-.195-.046a6.492 6.492 0 01-.573-.989c-.014-.031-.022-.11.059-.19l.815-.806c.411-.406.562-.957.53-1.456a4.587 4.587 0 010-.582c.032-.499-.119-1.05-.53-1.456l-.815-.806c-.08-.08-.073-.159-.059-.19a6.44 6.44 0 01.573-.99c.02-.029.086-.075.195-.045l1.103.303c.559.153 1.112.008 1.529-.27.16-.107.327-.204.5-.29.449-.222.851-.628.998-1.189l.289-1.105c.029-.11.101-.143.137-.146zM8 0c-.236 0-.47.01-.701.03-.743.065-1.29.615-1.458 1.261l-.29 1.106c-.017.066-.078.158-.211.224a5.994 5.994 0 00-.668.386c-.123.082-.233.09-.3.071L3.27 2.776c-.644-.177-1.392.02-1.82.63a7.977 7.977 0 00-.704 1.217c-.315.675-.111 1.422.363 1.891l.815.806c.05.048.098.147.088.294a6.084 6.084 0 000 .772c.01.147-.038.246-.088.294l-.815.806c-.474.469-.678 1.216-.363 1.891.2.428.436.835.704 1.218.428.609 1.176.806 1.82.63l1.103-.303c.066-.019.176-.011.299.071.213.143.436.272.668.386.133.066.194.158.212.224l.289 1.106c.169.646.715 1.196 1.458 1.26a8.094 8.094 0 001.402 0c.743-.064 1.29-.614 1.458-1.26l.29-1.106c.017-.066.078-.158.211-.224a5.98 5.98 0 00.668-.386c.123-.082.233-.09.3-.071l1.102.302c.644.177 1.392-.02 1.82-.63.268-.382.505-.789.704-1.217.315-.675.111-1.422-.364-1.891l-.814-.806c-.05-.048-.098-.147-.088-.294a6.1 6.1 0 000-.772c-.01-.147.039-.246.088-.294l.814-.806c.475-.469.679-1.216.364-1.891a7.992 7.992 0 00-.704-1.218c-.428-.609-1.176-.806-1.82-.63l-1.103.303c-.066.019-.176.011-.299-.071a5.991 5.991 0 00-.668-.386c-.133-.066-.194-.158-.212-.224L10.16 1.29C9.99.645 9.444.095 8.701.031A8.094 8.094 0 008 0zm1.5 8a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM11 8a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <DetailDropdown
                    dropDown={dropDown}
                    name={props.name}
                    dataArray={liData}
                    defaultClick={setDropDown}
                    handleClick={handleClick}
                ></DetailDropdown>
            </StyledOptionDiv>
            <StyledOptionDesDiv>
                <StyledOptionMessage data={props.data}>{props.message}</StyledOptionMessage>
                {urlData.map((ele) => (
                    <StyledOptionDesInnerDiv>
                        <StyledOptionImg src={ele.imageURL} />
                        <StyledOptionDes>{ele.userId}</StyledOptionDes>
                    </StyledOptionDesInnerDiv>
                ))}
                {colorData.map((ele) => (
                    <StyledOptionTag bgColor={ele ? ele.media : ""}>
                        {ele ? ele.value : ""}
                    </StyledOptionTag>
                ))}
                <StyledMilestoneDiv>
                    {props.name === "Milestone" ? (
                        <>
                            <p>{props.data.value}</p>
                            <StyledProgressBar
                                data={props.data}
                                value={close}
                                max={open + close}
                            />
                        </>
                    ) : null}
                </StyledMilestoneDiv>
            </StyledOptionDesDiv>
        </StyledOption>
    );
};

export default detailOption;
