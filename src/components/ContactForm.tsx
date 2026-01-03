import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Mail, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

interface ContactFormProps {
  locale?: 'ja' | 'en' | 'zh' | 'th' | 'de' | 'fr' | 'es';
}

export function ContactForm({ locale = 'ja' }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const translations = {
    ja: {
      title: 'お問い合わせ',
      description: 'ご質問やご相談がございましたら、お気軽にお問い合わせください。',
      name: 'お名前',
      namePlaceholder: '山田太郎',
      email: 'メールアドレス',
      emailPlaceholder: 'example@email.com',
      subject: '件名（任意）',
      subjectPlaceholder: 'お問い合わせの件名',
      message: 'メッセージ',
      messagePlaceholder: 'お問い合わせ内容をご記入ください...',
      submit: '送信する',
      sending: '送信中...',
      success: 'メールを送信しました。ありがとうございます！',
      error: '送信に失敗しました。しばらくしてから再度お試しください。',
      required: '必須',
    },
    en: {
      title: 'Contact',
      description: 'Feel free to reach out if you have any questions or inquiries.',
      name: 'Name',
      namePlaceholder: 'John Doe',
      email: 'Email',
      emailPlaceholder: 'example@email.com',
      subject: 'Subject (Optional)',
      subjectPlaceholder: 'Subject of your inquiry',
      message: 'Message',
      messagePlaceholder: 'Please enter your message...',
      submit: 'Send',
      sending: 'Sending...',
      success: 'Email sent successfully. Thank you!',
      error: 'Failed to send. Please try again later.',
      required: 'Required',
    },
    zh: {
      title: '联系',
      description: '如有任何问题或咨询，请随时与我们联系。',
      name: '姓名',
      namePlaceholder: '张三',
      email: '电子邮件',
      emailPlaceholder: 'example@email.com',
      subject: '主题（可选）',
      subjectPlaceholder: '您的咨询主题',
      message: '消息',
      messagePlaceholder: '请输入您的消息...',
      submit: '发送',
      sending: '发送中...',
      success: '邮件发送成功。谢谢！',
      error: '发送失败。请稍后再试。',
      required: '必填',
    },
    th: {
      title: 'ติดต่อ',
      description: 'หากมีคำถามหรือข้อสงสัย กรุณาติดต่อเราได้เลย',
      name: 'ชื่อ',
      namePlaceholder: 'ชื่อของคุณ',
      email: 'อีเมล',
      emailPlaceholder: 'example@email.com',
      subject: 'หัวข้อ (ไม่บังคับ)',
      subjectPlaceholder: 'หัวข้อการติดต่อ',
      message: 'ข้อความ',
      messagePlaceholder: 'กรุณากรอกข้อความของคุณ...',
      submit: 'ส่ง',
      sending: 'กำลังส่ง...',
      success: 'ส่งอีเมลสำเร็จ ขอบคุณ!',
      error: 'ส่งล้มเหลว กรุณาลองอีกครั้งในภายหลัง',
      required: 'จำเป็น',
    },
    de: {
      title: 'Kontakt',
      description: 'Bei Fragen oder Anfragen können Sie uns gerne kontaktieren.',
      name: 'Name',
      namePlaceholder: 'Max Mustermann',
      email: 'E-Mail',
      emailPlaceholder: 'example@email.com',
      subject: 'Betreff (Optional)',
      subjectPlaceholder: 'Betreff Ihrer Anfrage',
      message: 'Nachricht',
      messagePlaceholder: 'Bitte geben Sie Ihre Nachricht ein...',
      submit: 'Senden',
      sending: 'Wird gesendet...',
      success: 'E-Mail erfolgreich gesendet. Vielen Dank!',
      error: 'Senden fehlgeschlagen. Bitte versuchen Sie es später erneut.',
      required: 'Erforderlich',
    },
    fr: {
      title: 'Contact',
      description: 'N\'hésitez pas à nous contacter si vous avez des questions ou des demandes.',
      name: 'Nom',
      namePlaceholder: 'Jean Dupont',
      email: 'E-mail',
      emailPlaceholder: 'example@email.com',
      subject: 'Sujet (Optionnel)',
      subjectPlaceholder: 'Sujet de votre demande',
      message: 'Message',
      messagePlaceholder: 'Veuillez saisir votre message...',
      submit: 'Envoyer',
      sending: 'Envoi en cours...',
      success: 'E-mail envoyé avec succès. Merci !',
      error: 'Échec de l\'envoi. Veuillez réessayer plus tard.',
      required: 'Requis',
    },
    es: {
      title: 'Contacto',
      description: 'No dude en contactarnos si tiene alguna pregunta o consulta.',
      name: 'Nombre',
      namePlaceholder: 'Juan Pérez',
      email: 'Correo electrónico',
      emailPlaceholder: 'example@email.com',
      subject: 'Asunto (Opcional)',
      subjectPlaceholder: 'Asunto de su consulta',
      message: 'Mensaje',
      messagePlaceholder: 'Por favor ingrese su mensaje...',
      submit: 'Enviar',
      sending: 'Enviando...',
      success: 'Correo electrónico enviado con éxito. ¡Gracias!',
      error: 'Error al enviar. Por favor intente de nuevo más tarde.',
      required: 'Requerido',
    },
  };

  const t = translations[locale] || translations.ja;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        // 3秒後にステータスをリセット
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        setErrorMessage(data.error || t.error);
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage(t.error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="w-5 h-5" />
          {t.title}
        </CardTitle>
        <CardDescription>{t.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              {t.name} <span className="text-destructive">*</span>
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder={t.namePlaceholder}
              value={formData.name}
              onChange={handleChange}
              required
              disabled={status === 'loading'}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              {t.email} <span className="text-destructive">*</span>
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder={t.emailPlaceholder}
              value={formData.email}
              onChange={handleChange}
              required
              disabled={status === 'loading'}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium">
              {t.subject}
            </label>
            <Input
              id="subject"
              name="subject"
              type="text"
              placeholder={t.subjectPlaceholder}
              value={formData.subject}
              onChange={handleChange}
              disabled={status === 'loading'}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              {t.message} <span className="text-destructive">*</span>
            </label>
            <Textarea
              id="message"
              name="message"
              placeholder={t.messagePlaceholder}
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              disabled={status === 'loading'}
            />
          </div>

          {status === 'error' && (
            <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-md">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{errorMessage}</span>
            </div>
          )}

          {status === 'success' && (
            <div className="flex items-center gap-2 p-3 bg-green-500/10 text-green-600 dark:text-green-400 rounded-md">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-sm">{t.success}</span>
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={status === 'loading' || status === 'success'}
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {t.sending}
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                {t.submit}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}




