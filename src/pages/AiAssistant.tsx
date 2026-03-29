import { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import SendIcon from '@mui/icons-material/Send'
import { useTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'

interface Message {
  id: number
  text: string
  from: 'user' | 'ai'
}

export default function AiAssistant() {
  const { t } = useTranslation()
  const theme = useTheme()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, text: t('aiAssistant.greeting'), from: 'ai' },
  ])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function handleSend() {
    const text = input.trim()
    if (!text) return

    const userMsg: Message = { id: Date.now(), text, from: 'user' }
    const aiMsg: Message = {
      id: Date.now() + 1,
      text: t('aiAssistant.devResponse'),
      from: 'ai',
    }

    setMessages((prev) => [...prev, userMsg, aiMsg])
    setInput('')
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 128px)' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <AutoAwesomeIcon color="primary" />
        <Typography variant="h4">{t('aiAssistant.title')}</Typography>
      </Box>

      {/* Messages area */}
      <Paper
        variant="outlined"
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          mb: 2,
        }}
      >
        {messages.map((msg) => (
          <Box
            key={msg.id}
            sx={{
              display: 'flex',
              justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            <Box
              sx={{
                maxWidth: '70%',
                px: 2,
                py: 1.25,
                borderRadius:
                  msg.from === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                bgcolor:
                  msg.from === 'user'
                    ? theme.palette.primary.main
                    : theme.palette.secondary.main,
                color:
                  msg.from === 'user'
                    ? theme.palette.primary.contrastText
                    : theme.palette.secondary.contrastText,
              }}
            >
              <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
                {msg.text}
              </Typography>
            </Box>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Paper>

      {/* Input area */}
      <Paper
        variant="outlined"
        sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 1 }}
      >
        <InputBase
          fullWidth
          multiline
          maxRows={4}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t('aiAssistant.inputPlaceholder')}
          sx={{ fontSize: '0.9rem' }}
        />
        <IconButton
          color="primary"
          onClick={handleSend}
          disabled={!input.trim()}
          aria-label={t('aiAssistant.send')}
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </Box>
  )
}
