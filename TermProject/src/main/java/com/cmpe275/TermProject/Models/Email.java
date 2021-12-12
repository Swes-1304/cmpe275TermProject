package com.cmpe275.TermProject.Models;

public class Email {

    public String reciver;
    public String subject;
    public String body;

    public Email(){

    }

    public Email(String reciver, String subject, String body) {
        this.reciver = reciver;
        this.subject = subject;
        this.body = body;
    }

    public String getReciver() {
        return reciver;
    }

    public void setReciver(String reciver) {
        this.reciver = reciver;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }
}
