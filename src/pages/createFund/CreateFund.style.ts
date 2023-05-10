import styled from 'styled-components'

export const MainContainer = styled.div`
  weight: 100%;
  height: auto;
  padding: 20px;
  background: #fcfcfc;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`

export const HeaderDiv = styled.div`
  weight: 100%;
  display: flex;
  justify-content: space-between;
  background: #fcfcfc;
`
export const Heading = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #564dd0;
  background: #fcfcfc;
`
export const ExitBtn = styled.button`
  background: #fcfcfc;
  border: 1px solid #7e77dd;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  cursor: pointer;
`
export const ExitImg = styled.img`
  background: #fcfcfc;
  margin-right: 5px;
`
export const ProgressBar = styled.div`
  background: #fcfcfc;
  width: 100%;
  margin: 20px 0;
`
export const StepDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const StepText = styled.p`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #564dd0;
`
export const StepBtn = styled.button`
  background: #7e77dd;
  border-radius: 10px;
  border: none;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  width: 237px;
  height: 40px;
  line-height: 17px;
  cursor: pointer;
  text-align: center;
  color: #ffffff;
`

export const LineContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  height: auto;
  margin: 30px 0;
`
export const VerticalContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
  flex-direction: column;
  height: auto;
  margin: 30px 0;
`
export const InputField = styled.input`
  border: none;
  height: 40px;
  margin: auto 10px;
  color: #261047;
  padding: 0 10px;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  background: #ffffff;
  border: 1px solid #d4d1f3;
  border-radius: 5px;
  text-align: right;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #7678b5;
    text-align: left;
  }
`
export const Lable = styled.p`
  margin: 0;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  /* identical to box height */
  color: #564dd0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`
export const CheckLable = styled.p`
  display: flex;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  /* identical to box height */
  color: #564dd0;
  margin: 1rem 0;
`
export const AddImage = styled.button`
  margin: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  border: 1px solid #d4d1f3;
  border-radius: 4px;
  padding: 10px;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  text-align: center;
  color: #564dd0;
  img {
    margin-right: 5px;
  }
`
export const RadioButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
export const RadioButton = styled.input`
  margin: 0 20px;
  width: 20px;
  height: 20px;
  accent-color: #564dd0;
  border: 1px solid #564dd0;
  :checked {
    width: 20px;
    height: 20px;
    accent-color: #564dd0;
    border: 3px solid #d4d1f3;
  }
`
export const InnerLable = styled.label``

export const FeesContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
`
export const FeesDiv = styled.div`
  display: flex;
  margin-bottom: 10px;
  align-items: center;
`

export const TickImg = styled.img`
  margin: 0 10px;
`
