import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTestAccount, createTransport, Transporter, getTestMessageUrl } from 'nodemailer';
import { SentMessageInfo } from 'nodemailer/lib/smtp-transport';

import { Wish } from 'src/wishes/entities/wish.entity';


@Injectable()
export class MailService {
  private transporter: Transporter<SentMessageInfo>;
  private testEmailAccount: any;
  constructor(private configService: ConfigService) {}

  async sendEmail(mails: string[], wish: Wish) {
    this.testEmailAccount = await createTestAccount();
    this.transporter = createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        // user: this.configService.get('emailDistributionSMTPT.email'),
        // pass: this.configService.get('emailDistributionSMTPT.password'),
        user: this.testEmailAccount.user,
        pass: this.testEmailAccount.pass,
      },
    });

    const info = await this.transporter.sendMail({
      from: 'kupipodariday@yandex.ru',
      to: mails,
      subject: 'Уведомление',
      text: 'Сбор денег на подарок',
      html: `
        <div>
          <p>${wish.name}</p>
          <img src="${wish.image}">
          <a href="${wish.link}">Ссылка на подарок</a>
        </div>
      `,
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", getTestMessageUrl(info));

    return info;
  }

}