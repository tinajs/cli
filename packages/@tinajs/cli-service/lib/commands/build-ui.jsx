'use strict'

const React = require('react')
const { Box } = require('ink')

const UI = ({ stats = '...' }) => {
  return (
    <Box>
      { stats }
    </Box>
  )
}

module.exports = function (props) {
  return <UI {...props} />
}
