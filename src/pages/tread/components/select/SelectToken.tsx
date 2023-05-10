import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { tokenRegistry } from '@/constant/token'
import DownArrow from '@/assets/svg/ChevronDown.svg'
import BnbLogo from '@/assets/svg/Bnb.svg'
import { Typography } from '@mui/material'
import { TokenArrayProps } from '../../interface/TreadInterface'
import styled from 'styled-components'

const LogoImg = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`

export default function SelectToken({
  tokenArray,
  setTokenArray,
  selectToken,
  setSelectToken,
}: TokenArrayProps) {
  const [selectedToken, setSelectedToken] = useState('pleas')

  const CustomSelectIcon = () => {
    return (
      <img
        src={DownArrow}
        alt='select icon'
        style={{
          width: 15,
          height: '100%',
          margin: '0 10px',
          display: 'flex',
          alignItems: 'center',
          position: 'absolute',
          right: '-25px',
          top: '0',
        }}
      />
    )
  }
  const handleChange = (event: { target: { value: string } }) => {
    console.log(tokenArray)
    console.log(event.target.value)
    const result = tokenRegistry.find((elem) => elem.token === event.target.value)
    setSelectToken(result)
  }
  console.log(tokenArray)

  return (
    <Box
      sx={{
        minWidth: 150,
        backgroundColor: '#ffffff',
      }}
    >
      <FormControl fullWidth>
        {/* <InputLabel id='demo-simple-select-label'>Age</InputLabel> */}
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={selectToken?.token}
          onChange={handleChange}
          sx={{
            fontFamily: "'Montserrat'",
            color: '#261047',
            boxShadow: '0px 2px 4px #D9D9D9',
            '.MuiOutlinedInput-notchedOutline': { border: '1px solid #F1F0FA' },
            '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
              border: '1px solid #F1F0FA',
            },
            '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              border: '1px solid #F1F0FA',
            },
          }}
          MenuProps={{
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
          }}
          IconComponent={() => null}
          renderValue={(value) => (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {' '}
                <LogoImg src={BnbLogo} alt='logo' />
                {value || 'BNB'}
              </Typography>
              <CustomSelectIcon />
            </Box>
          )}
        >
          {/* <MenuItem value={tokenArray[0].token}>
            <LogoImg src={BnbLogo} alt='logo' /> Select
          </MenuItem> */}
          {tokenArray.map((elem, indx) => {
            return (
              <MenuItem key={indx} value={elem.token}>
                <LogoImg src={BnbLogo} alt='logo' /> {elem?.token}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </Box>
  )
}
