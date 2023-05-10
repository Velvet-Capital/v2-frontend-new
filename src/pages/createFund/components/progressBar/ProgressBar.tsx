import * as React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'
import { ProgressProps } from '../../interfaces/createFundInterfaces'

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 5,
  borderRadius: 2,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.mode === 'light' ? '#D4D1F3' : ' #D4D1F3',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 2,
    backgroundColor: theme.palette.mode === 'light' ? '#7E77DD' : '#7E77DD',
  },
}))

export default function CustomizedProgressBars({ progress }: ProgressProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <BorderLinearProgress variant='determinate' value={progress} />
    </Box>
  )
}
