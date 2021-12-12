package com.cmpe275.TermProject.Services;


import com.cmpe275.TermProject.Models.Email;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import java.sql.SQLException;
import java.util.Date;
import java.util.Properties;

@Transactional(rollbackFor = SQLException.class, propagation = Propagation.REQUIRED)
@Service
public class EmailServiceImpl implements EmailService {

    @Override
    public void sendEmail(Email email) {
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");

        Session session = Session.getInstance(props, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("cmpe275vaccinemanagementsystem@gmail.com", "vaccine1234");
            }
        });

        try{
            Message msg = new MimeMessage(session);
            msg.setFrom(new InternetAddress("cmpe275vaccinemanagementsystem@gmail.com", false));
            msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(email.getReciver()));
            msg.setSubject(email.getSubject());
            msg.setContent("BODY", "text/html");
            msg.setSentDate(new Date());

            MimeBodyPart messageBodyPart = new MimeBodyPart();
            messageBodyPart.setContent(email.getBody(), "text/html"); // Main Body!

            Multipart multipart = new MimeMultipart();
            multipart.addBodyPart(messageBodyPart);

            msg.setContent(multipart);
            Transport.send(msg);


        }catch(Exception error){
            System.out.println(error);
        }
    }
}
