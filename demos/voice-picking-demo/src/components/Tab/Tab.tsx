import React from 'react'
import { Box } from '@chakra-ui/react'
import theme from '@speechly-demos/ui/constants/theme'


const Tab: React.FC = (): JSX.Element => (
    <Box height='3.5rem' background={theme.colors.bauhaus} display='flex'>
        <Box
            style={{
                paddingTop: '0.75rem',
                color: 'white',
                fontWeight: 700,
                fontSize: '1.5rem',
                lineHeight: '1.75rem',
                fontFamily: theme.fonts.default,
                marginLeft: '1.875rem',
                background: '#777777',
                width: '11rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textTransform: 'uppercase'
            }}>
            1st stack
            <span
                style={{
                    fontSize: '14px',
                    lineHeight: '20px'
                }}>
                0 Cases total
            </span>
        </Box>
    </Box>
)

export default Tab