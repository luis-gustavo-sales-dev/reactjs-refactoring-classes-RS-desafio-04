import styled, { css } from 'styled-components';

interface StyledProps {
    isFocused: boolean;
    isFilled: boolean;
}
export const Container = styled.div<StyledProps>`
  display: flex;
  align-items: center;

  background: #fff;
  border-radius: 8px;
  padding: 18px 24px;
  width: 100%;
  font-size: 16px;

  & + div {
    margin-top: 24px;
  }

  h1 {
    margin-bottom: 40px;
    font-weight: 600;
    font-size: 36px;
    line-height: 36px;
  }

  ${(props) => {
    const retorno = props.isFocused ?
    css`
      color: #ff9000;
      border: #ff9000 solid 2px;
      border-color: #ff9000;
    ` :
    null
    return retorno
  }}




  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #b7b7cc;

    &::placeholder {
      color: #b7b7cc;
    }

    ${(props) => {
         
        const retorno = props.isFilled || props.isFocused ?
        css`
        color: #ff9000;`:
        css`
        color: #b7b7cc;`
        return retorno
    }
        
    }


  }

  svg {
    margin-right: 16px;
  }
`;
