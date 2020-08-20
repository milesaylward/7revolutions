export const SPEAKER_FORM = {
  formData: {
    name: {
      label: 'Name',
      value: '',
      required: true
    },
    email: {
      label: 'Email',
      value: '',
      required: true
    },
    company_name: {
      label: 'Company Name',
      value: '',
      required: true
    },
    company_website: {
      label: 'Company Website',
      value: '',
      required: true
    },
    date: {
      label: 'Date',
      value: '',
      required: true
    },
    event_length: {
      label: 'Estimated Length',
      value: '',
      required: true,
      options: [
        '45 Minutes',
        '1 Hour',
        '1.5 Hours',
        '2 Hours',
        '3 Hours',
        'Half Day',
        'Full Day'
      ],
      type: 'Select'
    },
    speaker_budget: {
      label: 'Speaker Budget',
      value: '',
      required: true,
      type: 'Number'
    },
    audience_size: {
      label: 'Audience Size',
      value: '',
      required: true,
      type: 'Number'
    },
    audience_demographic: {
      label: 'Audience Demographic',
      value: '',
      type: 'textArea',
      help: 'Example: millenials, educators, mostly male or female etc.',
      required: true
    },
    event_focus: {
      label: 'Event Focus',
      type: 'Radio',
      value: '',
      required: true,
      options: [
        'Millennials & The Future of Leadership',
        'Diversity & Inclusion through a gender lens',
        'Diversity & Inclusion through a race lens',
        'Diversity & Inclusion through a generational lens'
      ]
    },
    event_vision: {
      label: 'What is your vision for the event?',
      type: 'textArea',
      value: '',
      required: true
    },
    further_info: {
      label: 'Is there any other information you want us to know? (optional)',
      help: 'We understand that every event is unique. If there is any information you would like us to include in our consideration please include it here.',
      type: 'textArea',
      value: ''
    }
  },
  tabs: [
    { title: 'Your Information', fields: ['name', 'email', 'company_name', 'company_website'] },
    { title: 'Event Information', fields: ['date', 'event_length', 'event_focus', 'event_vision'] },
    { title: 'Other Information', fields: ['speaker_budget', 'audience_size', 'audience_demographic', 'further_info'] }
  ]
}
