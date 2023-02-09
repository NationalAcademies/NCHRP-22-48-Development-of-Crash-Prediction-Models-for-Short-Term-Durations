module.exports = [
    {
        variable: 'Log Volume',
        description: 'The logarithm of volume of the target segment',
        sampleValue: '10,000'
    },
    {
        variable: 'Log Avg. Speed',
        description: 'The logarithm of average speed of the target segment',
        sampleValue: '60'
    },
    {
        variable: 'Log Avg. Speed(Upstream)',
        description: 'The logarithm of average speed of the consecutive upstream segment',
        sampleValue: '62'
    },
    {
        variable: 'Log Avg. Speed(Downstream)',
        description: 'The logarithm of average speed of the consecutive downstream segment',
        sampleValue: '59'
    },
    {
        variable: 'Diff. Avg. Speed(Target-Down)',
        description: 'The difference of average speed between target and downstream segments',
        sampleValue: '1'
    },
    {
        variable: 'Diff. Avg. Speed(Upstream-Target)',
        description: 'The difference of average speed between upstream and target segments',
        sampleValue: '2'
    },
    {
        variable: 'Diff. Avg. Speed(Upstream-Downstream)',
        description: 'The difference of average speed between upstream and downstream segments',
        sampleValue: '3'
    },
    {
        variable: 'Avg. Occupancy',
        description: 'The average occupancy of the target segment',
        sampleValue: '0.2'
    },
    {
        variable: 'Avg. Occupancy(Upstream)',
        description: 'The average occupancy of the consecutive upstream segment',
        sampleValue: '0.1'
    },
    {
        variable: 'Avg. Occupancy(Downstream)',
        description: 'The average occupancy of the consecutive downstream segment',
        sampleValue: '0.3'
    },
    {
        variable: 'Diff. Avg. Occupancy(Downstream-Target)',
        description: 'The difference of average occupancy between downstream and target segments',
        sampleValue: '0.1'
    },
    {
        variable: 'Diff. Avg. Occupancy(Target-Upstream)',
        description: 'The difference of average occupancy between target and upstream segments',
        sampleValue: '0.1'
    },
    {
        variable: 'Diff. Avg. Occupancy(Downstream-Upstream)',
        description: 'The difference of average occupancy between downstream and upstream segments',
        sampleValue: '0.2'
    }
]