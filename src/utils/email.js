import emailjs from '@emailjs/browser'

const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID

emailjs.init(PUBLIC_KEY)

export async function sendContactForm(data) {
  // 1. Notify business
  await emailjs.send(SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_CONTACT, {
    from_name:    data.name,
    from_email:   data.email,
    from_mobile:  data.mobile || '—',
    subject:      data.subject,
    message:      data.message || '—',
    to_email:     'amarrnaikk@gmail.com',
  })

  // 2. Auto-reply to user
  await emailjs.send(SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_CONTACT_REPLY, {
    to_name:  data.name,
    to_email: data.email,
  })
}

export async function sendEventsForm(data) {
  // 1. Notify business
  await emailjs.send(SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_EVENTS, {
    from_name:   `${data.firstName} ${data.lastName}`,
    from_email:  data.email,
    from_phone:  data.phone || '—',
    event_type:  data.eventType,
    event_date:  data.date || '—',
    guests:      data.guests || '—',
    city:        data.city || '—',
    message:     data.message || '—',
    to_email:    'amarrnaikk@gmail.com',
  })

  // 2. Auto-reply to user
  await emailjs.send(SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_EVENTS_REPLY, {
    to_name:  data.firstName,
    to_email: data.email,
  })
}
