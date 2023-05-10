import styled from 'styled-components'

export const ConnectContainer = styled.div`
  margin-top: 20px;
  width: 550px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
export const Logo = styled.img`
  width: 48px;
`
export const CloseLogo = styled.img`
  position: absolute;
  cursor: pointer;
  right: 1rem;
  width: 20px;
  height: 20px;
`
export const ConnectModalTitle = styled.p`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 21px;
  line-height: 26px;
  text-align: center;
  margin: 20px 0;
  color: #564dd0;
`
export const ConnectBtnDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  justify-self: center;
`
export const ConnectBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 10px;
  width: 220px;
  height: 70px;
  box-shadow: 0 0 5px 0 #7e77dd;
  background-color: #fff;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  color: #564dd0;
  cursor: pointer;
`
export const CreateWalletDiv = styled.div`
  position: relative;
  width: 80%;
  margin: auto;
`
export const CreateWalletInput = styled.input`
  width: 100%;
  height: 50px;
  color: #7678b5;
  border: 1px solid #d4d1f3;
  border-radius: 5px;
  padding: 10px 100px 10px 20px;
  line-height: 1;
  box-sizing: border-box;
  outline: none;
  background-color: #fff;
`
export const CreateWalletBtn = styled.img`
  position: absolute;
  right: 0px;
  width: 75px;
  border: 0;
  cursor: pointer;
  height: 50px;
  background: #55d27c;
  color: #fff;
  outline: none;
  margin: 0;
  border-radius: 0 5px 5px 0;
  z-index: 2;
`
export const MagicLink = styled.img`
  margin: 30px 0;
`
export const FooterText = styled.p`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  margin: 20px 0;
  color: #b3b3b3;
`
