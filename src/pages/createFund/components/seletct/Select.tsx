import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { tokenRegistry } from '@/constant/token'
import DownArrow from '../../assets/ChevronDown.svg'
import { Typography } from '@mui/material'
import { TokenArrayProps } from '../../interfaces/createFundInterfaces'

interface SelectProps extends TokenArrayProps {
  onClose: () => void
}

export default function SelectToken({ setTokenArray, onClose }: SelectProps) {
  const [selectedToken, setSelectedToken] = useState('Select an Token')

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
    setSelectedToken(event.target.value)
    setTokenArray((prevTokenArray) => {
      const updatedTokenArray = [...prevTokenArray]
      const index = updatedTokenArray.findIndex((elem) => elem.token === event.target.value)
      if (index === -1) {
        updatedTokenArray.push({
          token: event.target.value,
          address: tokenRegistry.find((token) => token.token === event.target.value)!.address,
          allocation: '0',
        })
      }
      return updatedTokenArray
    })
    onClose()
  }

  return (
    <Box
      sx={{
        minWidth: 220,
      }}
    >
      <FormControl fullWidth>
        {/* <InputLabel id='demo-simple-select-label'>Age</InputLabel> */}
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={selectedToken}
          onChange={handleChange}
          sx={{
            fontFamily: "'Montserrat'",
            color: '#7678B5',
            boxShadow: 'none',
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
              <Typography>{value || 'Select an Token'}</Typography>
              <CustomSelectIcon />
            </Box>
          )}
        >
          <MenuItem value='Select an Token' disabled>
            Select an Token
          </MenuItem>
          {tokenRegistry.map((elem, indx) => {
            return (
              <MenuItem key={indx} value={elem.token}>
                {elem?.token}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </Box>
  )
}
