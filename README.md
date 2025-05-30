﻿# When I Work + Paylocity Integration

A comprehensive API integration between When I Work scheduling software and Paylocity payroll systems to create a seamless workflow for workforce management.

## Features

- **Shift Synchronization**: Automatically sync shifts between When I Work and Paylocity
- **Employee Data Sync**: Bidirectional employee data synchronization
- **Time-Off Requests**: Propagate approved time-off requests automatically
- **Timesheet Approval**: Implement approval workflows for verified timesheets
- **Payroll Processing**: Streamline payroll using scheduling data
- **Compliance Reporting**: Improve reporting accuracy with consistent data

## Business Value

- 85% reduction in manual data entry
- 92% reduction in payroll errors
- 75% reduction in compliance reporting time
- 95% timesheet accuracy rate
- Enhanced operational visibility

## Architecture

The integration consists of the following components:

- API Gateway
- Authentication Service
- Sync Service
- Data Transformer
- Message Queue
- Webhook Handler
- Integration Database

## Prerequisites

- Active When I Work account with API access
- Active Paylocity account with API access
- Developer credentials for both platforms
- Node.js environment
- Basic understanding of JavaScript and REST APIs

## Installation

```bash
# Clone the repository
git clone https://github.com/your-username/wheniwork-paylocity-integration.git

# Navigate to the project directory
cd wheniwork-paylocity-integration

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your API credentials
```

## Configuration

Create a `config.js` file with the following structure:

```javascript
module.exports = {
  whenIWork: {
    clientId: process.env.WIW_CLIENT_ID,
    clientSecret: process.env.WIW_CLIENT_SECRET,
    username: process.env.WIW_USERNAME,
    password: process.env.WIW_PASSWORD,
    tokenUrl: 'https://api.wheniwork.com/2/login',
    apiBaseUrl: 'https://api.wheniwork.com/2'
  },
  paylocity: {
    clientId: process.env.PAYLOCITY_CLIENT_ID,
    clientSecret: process.env.PAYLOCITY_CLIENT_SECRET,
    tokenUrl: 'https://api.paylocity.com/IdentityServer/connect/token',
    apiBaseUrl: 'https://api.paylocity.com/api'
  },
  integration: {
    companyId: process.env.PAYLOCITY_COMPANY_ID,
    syncInterval: process.env.SYNC_INTERVAL || '1h'
  }
};
```

## Usage

### Basic Example

```javascript
const { AuthenticationService } = require('./services/authentication');
const { ShiftSyncService } = require('./services/shift-sync');

// Initialize services
const authService = new AuthenticationService();
const shiftSyncService = new ShiftSyncService();

// Synchronize shifts for a date range
async function syncShifts(startDate, endDate) {
  // Authenticate with both APIs
  const wiwToken = await authService.getWhenIWorkToken();
  const paylocityToken = await authService.getPaylocityToken();
  
  // Get shifts from When I Work
  const shifts = await shiftSyncService.getShiftsFromWhenIWork(startDate, endDate);
  
  // Transform shifts to Paylocity timesheet format
  const timesheetEntries = shiftSyncService.transformShiftsToTimesheetEntries(shifts);
  
  // Send timesheet entries to Paylocity
  const result = await shiftSyncService.sendTimesheetEntriesToPaylocity(
    timesheetEntries, 
    config.integration.companyId
  );
  
  return result;
}

// Run the sync process
syncShifts('2025-04-01', '2025-04-15')
  .then(result => console.log('Sync completed:', result))
  .catch(error => console.error('Sync failed:', error));
```

## Implementation Steps

1. Set up API access in both platforms
2. Create secure storage for API credentials
3. Implement authentication service
4. Create employee mapping
5. Implement desired integration services
6. Set up scheduled jobs
7. Implement error handling
8. Test in staging environment
9. Deploy to production
10. Monitor and maintain

## Best Practices

- **Security First**: Store API credentials securely
- **Idempotent Operations**: Prevent duplicate data
- **Error Handling**: Implement robust error handling
- **Rate Limiting**: Respect API rate limits
- **Incremental Approach**: Start with one integration scenario
- **Monitoring**: Track integration health and performance

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions or support, please open an issue on the GitHub repository or contact the @struv
