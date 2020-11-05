import React, { useState, useEffect } from "react";
import styled from "styled-components";

const StyledBannersListDiv = styled.div`
    display: flex;
    width: 1200px;
    height: 100%;
    overflow: auto;
    border-top: 1px solid #eaecef;

    &:hover {
        background-color: rgba(236, 239, 241, 1);
    }
`;

const StyledBannerCheckBoxDiv = styled.div`
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
`;

const StyledBannerCheckBoxInput = styled.input.attrs({
    type: "checkbox",
})``;

const StyledBannerOpenClosedDiv = styled.div``;

const StyledBannerOpenClosedIcon = styled.i``;

const StyledBannerTextDiv = styled.div``;

const StyledBannerTitle = styled.p`
    font-size: 1em;
    margin: 0;
`;

const StyledBannerInfo = styled.p`
    font-size: 0.7em;
    margin: 0;
`;

let count = 0;
let total;

const IssueTitle = (props) => {
    const [checked, setChecked] = useState(false);
    const openOrClosed = props.status === 1 ? "opened" : "closed";

    const timeNow = Date.now();
    const updatedTimeBefore = new Date(
        timeNow - new Date(props.writingTime)
    ).getDate();

    useEffect(() => {
        if (props.checked) {
            setChecked(props.checked);
            count = props.count;
        } else {
            if (count == props.count || count == 0) {
                setChecked(props.checked);
                count = 0;
            }
        }
    }, [props.checked]);

    const checkedFunc = () => {
        return checked;
    };

    const setCheckFunc = () => {
        if (checked) {
            //취소를 누르면
            props.excludeIssueFunc(props.issueId);
            props.func2(false);
            count--;
        } else {
            count++;
            props.addIssueFunc(props.issueId);
            if (count == props.count) {
                props.func2(true);
            }
        }
        props.selectedFunc(count);
        setChecked(!checked);
    };

    return (
        <StyledBannersListDiv>
            <StyledBannerCheckBoxDiv>
                <StyledBannerCheckBoxInput
                    checked={checkedFunc()}
                    onChange={setCheckFunc}
                />
            </StyledBannerCheckBoxDiv>

            <StyledBannerOpenClosedDiv>
                <StyledBannerOpenClosedIcon />
            </StyledBannerOpenClosedDiv>

            <StyledBannerTextDiv>
                <StyledBannerTitle>{props.issueTitle}</StyledBannerTitle>
                {console.log(props.labelInfo)}
                <StyledBannerInfo>
                    #{props.issueId} by {props.userId} was {openOrClosed}{" "}
                    {updatedTimeBefore} days ago
                </StyledBannerInfo>
            </StyledBannerTextDiv>
        </StyledBannersListDiv>
    );
};

export default IssueTitle;
