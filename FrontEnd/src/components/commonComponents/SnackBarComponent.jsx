import { Alert, Snackbar } from '@mui/material'
import React from 'react'

export default function SnackBarComponent({snackbar,handleCloseSnackbar}) {
  return (
       <Snackbar
            open={snackbar.open}
            autoHideDuration={2000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={snackbar.severity}
              variant="filled"
              sx={{ width: '100%' }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
  )
}
