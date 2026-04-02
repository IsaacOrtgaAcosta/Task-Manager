import { Box, Pagination } from "@mui/material"

export const PaginationComponent = ({page, count, onChange}) => {
  return (
    <Box sx={{display: 'flex', justifyContent: 'center', mt: 2}}>
        <Pagination
        page={page}
        count={count}
        onChange={onChange}
        color='#E63346'
        />

    </Box>
  )
}

