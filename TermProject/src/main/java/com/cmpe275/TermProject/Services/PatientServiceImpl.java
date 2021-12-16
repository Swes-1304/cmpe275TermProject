package com.cmpe275.TermProject.Services;
import com.cmpe275.TermProject.Models.Address;
import com.cmpe275.TermProject.Models.Email;
import com.cmpe275.TermProject.Models.Patient;
import com.cmpe275.TermProject.Repository.PatientRepository;
import com.cmpe275.TermProject.Services.PatientService;

import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.*;
import java.util.logging.Logger;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

@Transactional(rollbackFor = SQLException.class, propagation = Propagation.REQUIRED)
@Service
public class PatientServiceImpl implements PatientService {

    @Autowired
    PatientRepository patientRepository;

    @Autowired
    EmailServiceImpl emailService;



    @Override
    public ResponseEntity<?> signUpUser(Map<String, Object> reqBody) {
        System.out.println("IN Patient Service Implementation:"+reqBody);

        // Email must be unique -
        List<Patient> patientList = patientRepository.findAll();

        for(Patient patient : patientList){
            if(patient.getEmail().equals((String)reqBody.get("email"))){
                System.out.println("Same Email");
                return new ResponseEntity<>("Email Id already exist!", HttpStatus.BAD_REQUEST);
            }
        }

        Patient newPatient = new Patient();
        newPatient.setEmail((String) reqBody.get("email"));
        newPatient.setPassword((String) reqBody.get("password"));
        newPatient.setFirstName((String) reqBody.get("firstName"));
        newPatient.setMiddleName((String) reqBody.get("middleName"));
        newPatient.setLastName((String) reqBody.get("lastName"));
        newPatient.setDOB((String) reqBody.get("dob"));

        // Address

        Map<String, String> addressMap =(Map<String, String>) reqBody.get("address");

        Address newAddress = new Address();
        newAddress.setStreet(addressMap.get("street"));
        newAddress.setNumber(addressMap.get("apt"));
        newAddress.setCity(addressMap.get("city"));
        newAddress.setState(addressMap.get("state"));
        newAddress.setZipCode(String.valueOf(addressMap.get("zipcode")));

        newPatient.setAddress(newAddress);

        //

        newPatient.setGender((String) reqBody.get("gender"));

        // Checking if the patient can be admin or not
        String[] fullEmail = (String[]) ((String) reqBody.get("email")).split("@");
        String[] domain = fullEmail[1].split("\\."); // For splitting on . use \\.

        if(domain[0].equalsIgnoreCase("sjsu")){
            newPatient.setAdminBoolean(true);
        }else{
            newPatient.setAdminBoolean(false);
        }

        newPatient.setGoogleSubId("-1"); // Normal User no Google sign on

        try{
            Patient returnedPatient = patientRepository.save(newPatient);

        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>("error",HttpStatus.BAD_REQUEST);
        }

        // Mailing part
        // Create email object
        //Then pass to that emailserivceimplementaion

        Email email = new Email();
        email.setReciver((String) reqBody.get("email"));
        email.setSubject("Verification Code Vaccination Management System.");
        //Random 5 digit code
        int code = generateVerificationCode();
        email.setBody("Your verification code is:"+ code);

        emailService.sendEmail(email);
        //
        Map<String, Object> res = new HashMap<>();
        res.put("patient", newPatient);
        res.put("code",code);
        return new ResponseEntity<>(res,HttpStatus.CREATED);

    }

    @Override
    public ResponseEntity<?> loginUser(Map<String, Object> reqBody) {

        System.out.println(reqBody);

        try{
            Patient patient = patientRepository.findByEmail((String) reqBody.get("email"));

            System.out.println("Patient:"+patient);
            if(patient == null){
                return new ResponseEntity<>("Email does not exist",HttpStatus.BAD_GATEWAY);
            }

            if(patient.getPassword().equals((String) reqBody.get("password"))){
                return new ResponseEntity<>(patient, HttpStatus.OK);
            }else{
                return new ResponseEntity<>("Password does not Match",HttpStatus.BAD_REQUEST);
            }

        }catch(Exception error){
            error.printStackTrace();
            return new ResponseEntity<>("Error while querying",HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<?> googleSignon(Map<String, Object> reqBody) {

        System.out.println("Req.body" + reqBody);

        String token = (String) reqBody.get("token");
        String subId = (String) reqBody.get("subId");




        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                // Specify the CLIENT_ID of the app that accesses the backend:
                .setAudience(Collections.singletonList("384093796098-o4v5sjmes3i4stdnj9kepq5ftrkno6t9.apps.googleusercontent.com"))
                // Or, if multiple clients access the backend:
                //.setAudience(Arrays.asList(CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3))
                .build();

        try{
            GoogleIdToken idToken = verifier.verify(token);
            if (idToken != null) {
                Payload payload = idToken.getPayload();

                // Print user identifier
                String userId = payload.getSubject();
                System.out.println("User ID: " + userId);

                // Get profile information from payload
                String email = payload.getEmail();
                boolean emailVerified = Boolean.valueOf(payload.getEmailVerified());
                String name = (String) payload.get("name");
                String pictureUrl = (String) payload.get("picture");
                String locale = (String) payload.get("locale");
                String familyName = (String) payload.get("family_name");
                String givenName = (String) payload.get("given_name");

                System.out.println("email:"+email);
                System.out.println("givenName:"+name);

                // New or Existing user Logic
                List<Patient> patientList = patientRepository.findAll();

                for(Patient patient: patientList){
                    if(patient.getGoogleSubId().equals(subId)){
                        // Existing user directly login to dashboard
                        return new ResponseEntity<>(patient, HttpStatus.OK);
                    }
                }
            } else {
                System.out.println("Invalid ID token.");
                return new ResponseEntity<>("Invalid ID token.", HttpStatus.BAD_REQUEST);
            }

        }catch(Exception error){
        	 System.out.println(error);
        	 return new ResponseEntity<>("User Not Found", HttpStatus.BAD_REQUEST);             
        }


        // user does not exist // should make changes
        return new ResponseEntity<>("Newuser", HttpStatus.PARTIAL_CONTENT); // code - 206

    }

    @Override
    public ResponseEntity<?> getBackendOtp(String email) {
        Email thisemail = new Email();
        thisemail.setReciver(email);
        thisemail.setSubject("Verification Code Vaccination Management System.");
        //Random 5 digit code
        int code = generateVerificationCode();
        thisemail.setBody("Your verification code is:"+ code);

        emailService.sendEmail(thisemail);

        return new ResponseEntity<>(code,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> googleSignup(Map<String, Object> reqBody) {

        System.out.println("ReqBody:"+reqBody);
        //New Google sign in user
        // get all details
        Patient newPatient = new Patient();
        newPatient.setFirstName((String) reqBody.get("firstName"));
        newPatient.setMiddleName((String) reqBody.get("middleName"));
        newPatient.setLastName((String) reqBody.get("lastName"));
        newPatient.setDOB((String) reqBody.get("dob"));

        Map<String, String> addressMap =(Map<String, String>) reqBody.get("address");

        Address newAddress = new Address();
        newAddress.setStreet(addressMap.get("street"));
        newAddress.setNumber(addressMap.get("apt"));
        newAddress.setCity(addressMap.get("city"));
        newAddress.setState(addressMap.get("state"));
        newAddress.setZipCode(String.valueOf(addressMap.get("zipcode")));

        newPatient.setAddress(newAddress);
        newPatient.setGender((String) reqBody.get("gender"));

        // Email and sub id part

        String token = (String) reqBody.get("token");
        String subId = (String) reqBody.get("subId");

        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                // Specify the CLIENT_ID of the app that accesses the backend:
                .setAudience(Collections.singletonList("384093796098-o4v5sjmes3i4stdnj9kepq5ftrkno6t9.apps.googleusercontent.com"))
                // Or, if multiple clients access the backend:
                //.setAudience(Arrays.asList(CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3))
                .build();

        try{
            GoogleIdToken idToken = verifier.verify(token);
            if (idToken != null) {
                Payload payload = idToken.getPayload();

                // Print user identifier
                String userId = payload.getSubject();
                System.out.println("User ID: " + userId);

                // Get profile information from payload
                String email = payload.getEmail();
                boolean emailVerified = Boolean.valueOf(payload.getEmailVerified());
                String name = (String) payload.get("name");
                String pictureUrl = (String) payload.get("picture");
                String locale = (String) payload.get("locale");
                String familyName = (String) payload.get("family_name");
                String givenName = (String) payload.get("given_name");

                System.out.println("email:"+email);
                System.out.println("givenName:"+name);
                newPatient.setEmail(email);
                newPatient.setGoogleSubId(subId);

                // Checking if the patient can be admin or not
                String[] fullEmail = (String[]) (email).split("@");
                String[] domain = fullEmail[1].split("\\."); // For splitting on . use \\.

                if(domain[0].equalsIgnoreCase("sjsu")){
                    newPatient.setAdminBoolean(true);
                }else{
                    newPatient.setAdminBoolean(false);
                }

                newPatient.setPassword("-1");
                try{
                    patientRepository.save(newPatient);

                    Email thisemail = new Email();
                    thisemail.setReciver(email);
                    thisemail.setSubject("Verification Code Vaccination Management System.");
                    //Random 5 digit code
                    int code = generateVerificationCode();
                    thisemail.setBody("Your verification code is:"+ code);

                    emailService.sendEmail(thisemail);
                    //
                    Map<String, Object> res = new HashMap<>();
                    res.put("patient", newPatient);
                    res.put("code",code);
                    return new ResponseEntity<>(res,HttpStatus.CREATED);


                }catch (Exception error){
                    System.out.println("Error");
                    return new ResponseEntity<>("Error saving the patient details", HttpStatus.BAD_REQUEST);

                }

            } else {
                System.out.println("Invalid ID token.");

            }

        }catch(Exception error){
            System.out.println(error);
        }

        return new ResponseEntity<>("Some Error Occured. Please try again",HttpStatus.BAD_REQUEST);
    }

    @Override
    public ResponseEntity<?> testEmail() {
//        Properties props = new Properties();
//        props.put("mail.smtp.auth", "true");
//        props.put("mail.smtp.starttls.enable", "true");
//        props.put("mail.smtp.host", "smtp.gmail.com");
//        props.put("mail.smtp.port", "587");
//
//        Session session = Session.getInstance(props, new javax.mail.Authenticator() {
//            protected PasswordAuthentication getPasswordAuthentication() {
//                return new PasswordAuthentication("cmpe275vaccinemanagementsystem@gmail.com", "vaccine1234");
//            }
//        });
//
//        try{
//            Message msg = new MimeMessage(session);
//            msg.setFrom(new InternetAddress("cmpe275vaccinemanagementsystem@gmail.com", false));
//            msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse("swaroop07patwari@gmail.com"));
//            msg.setSubject("SUBJECT");
//            msg.setContent("BODY", "text/html");
//            msg.setSentDate(new Date());
//
//            MimeBodyPart messageBodyPart = new MimeBodyPart();
//            messageBodyPart.setContent("BODY1", "text/html"); // Main Body!
//
//            Multipart multipart = new MimeMultipart();
//            multipart.addBodyPart(messageBodyPart);
//
//            msg.setContent(multipart);
//            Transport.send(msg);
//
//
//        }catch(Exception error){
//            System.out.println(error);
//        }

        Email email = new Email();
        email.setReciver("swes1304@gmail.com");
        email.setSubject("Verification Code Vaccination Management System.");
        email.setBody("Your code is:12345");

        emailService.sendEmail(email);

        return new ResponseEntity<>("Email sent!", HttpStatus.OK);
    }

    public int generateVerificationCode(){
        Random r = new Random( System.currentTimeMillis() );
        return 10000 + r.nextInt(20000);
    }

}
