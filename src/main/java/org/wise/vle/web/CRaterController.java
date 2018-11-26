/**
 * Copyright (c) 2008-2017 Regents of the University of California (Regents).
 * Created by WISE, Graduate School of Education, University of California, Berkeley.
 *
 * This software is distributed under the GNU General Public License, v3,
 * or (at your option) any later version.
 *
 * Permission is hereby granted, without written agreement and without license
 * or royalty fees, to use, copy, modify, and distribute this software and its
 * documentation for any purpose, provided that the above copyright notice and
 * the following two paragraphs appear in all copies of this software.
 *
 * REGENTS SPECIFICALLY DISCLAIMS ANY WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE. THE SOFTWARE AND ACCOMPANYING DOCUMENTATION, IF ANY, PROVIDED
 * HEREUNDER IS PROVIDED "AS IS". REGENTS HAS NO OBLIGATION TO PROVIDE
 * MAINTENANCE, SUPPORT, UPDATES, ENHANCEMENTS, OR MODIFICATIONS.
 *
 * IN NO EVENT SHALL REGENTS BE LIABLE TO ANY PARTY FOR DIRECT, INDIRECT,
 * SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES, INCLUDING LOST PROFITS,
 * ARISING OUT OF THE USE OF THIS SOFTWARE AND ITS DOCUMENTATION, EVEN IF
 * REGENTS HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
package org.wise.vle.web;

import java.io.IOException;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.wise.portal.domain.user.User;
import org.wise.portal.presentation.web.controllers.ControllerUtil;
import org.wise.vle.domain.annotation.Annotation;
import org.wise.vle.domain.webservice.crater.CRaterHttpClient;

@Controller
public class CRaterController {

  @Autowired
  private Properties wiseProperties;

  /**
   * Handle requests to the CRater server
   * @param request
   * @param response
   * @throws IOException
   */
  @RequestMapping("/cRater")
  protected ModelAndView handleRequestInternal(
      HttpServletRequest request,
      HttpServletResponse response) throws Exception {
    User signedInUser = ControllerUtil.getSignedInUser();
    String cRaterRequestType = request.getParameter("cRaterRequestType");
    boolean allowedAccess = false;

    /*
     * preview mode can make all CRater requests
     * teachers can make all CRater requests
     * students can only make CRater scoring requests
     */
    if ("preview".equals(request.getParameter("wiseRunMode"))) {
      allowedAccess = true;
    } else if (signedInUser == null) {
      allowedAccess = false;
    } else if (SecurityUtils.isAdmin(signedInUser)) {
      allowedAccess = true;
    } else if (SecurityUtils.isTeacher(signedInUser)) {
      allowedAccess = true;
    } else if (SecurityUtils.isStudent(signedInUser) &&
        (cRaterRequestType != null && cRaterRequestType.equals("scoring"))) {
      allowedAccess = true;
    }

    if (!allowedAccess) {
      response.sendError(HttpServletResponse.SC_FORBIDDEN);
      return null;
    }

    String cRaterItemType = request.getParameter("cRaterItemType");
    String cRaterVerificationUrl = "";
    String cRaterScoringUrl = "";
    String cRaterClientId = "";

    if (cRaterItemType == null || cRaterItemType.equals("CRATER")) {
      cRaterVerificationUrl = wiseProperties.getProperty("cRater_verification_url");
      cRaterScoringUrl = wiseProperties.getProperty("cRater_scoring_url");
      cRaterClientId = wiseProperties.getProperty("cRater_client_id");
    } else if (cRaterItemType.equals("HENRY")) {
      cRaterVerificationUrl = wiseProperties.getProperty("henry_verification_url");
      cRaterScoringUrl = wiseProperties.getProperty("henry_scoring_url");
      cRaterClientId = wiseProperties.getProperty("henry_client_id");
    }

    String itemId = request.getParameter("itemId");
    String responseId = request.getParameter("responseId");
    String studentData = request.getParameter("studentData");
    String responseString = null;

    if ("scoring".equals(cRaterRequestType)) {
      responseString = handleScoringRequest(cRaterScoringUrl, cRaterClientId, itemId,
          responseId, studentData);
    } else if ("verify".equals(cRaterRequestType)) {
      responseString = handleVerifyRequest(cRaterVerificationUrl, cRaterClientId, itemId);
    }

    if (responseString != null) {
      try {
        if ("preview".equals(request.getParameter("wiseRunMode"))) {
          if (responseString != null) {
            JSONObject studentNodeStateResponse = null;
            Long nodeStateId = null;

            JSONObject cRaterResponseJSONObj =
              Annotation.createCRaterNodeStateAnnotation(
                nodeStateId,
                CRaterHttpClient.getScore(responseString),
                CRaterHttpClient.getConcepts(responseString),
                studentNodeStateResponse,
                responseString);
            response.getWriter().write(cRaterResponseJSONObj.toString());
          }
        } else {
          response.getWriter().write(responseString);
        }
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
    return null;
  }

  /**
   * Handle the scoring request to the CRater server
   * e.g.
   * http://localhost:8080/wise/cRater?cRaterRequestType=scoring&itemId=Photo_Sun&responseId=1&studentData=hello
   *
   * @param cRaterUrl the CRater server url for scoring
   * @param cRaterClientId the client id e.g. "WISETEST"
   * @param itemId the item id e.g. "Photo_Sun"
   * @param responseId the response id
   * @param studentData the student work
   * @return the response xml string received from the CRater server
   */
  private String handleScoringRequest(String cRaterUrl, String cRaterClientId, String itemId, String responseId, String studentData) {
    String cRaterScoringResponse = CRaterHttpClient.getCRaterScoringResponse(cRaterUrl, cRaterClientId, itemId, responseId, studentData);
    return cRaterScoringResponse;
  }

  /**
   * Handle the verify request to the CRater server
   * e.g.
   * http://localhost:8080/wise/cRater?cRaterRequestType=verify&itemId=Photo_Sun
   *
   * @param cRaterUrl the CRater server url for verifying
   * @param cRaterClientId the client id e.g. "WISETEST"
   * @param itemId the item id e.g. "Photo_Sun"
   * @return the response xml string received from the CRater server
   */
  private String handleVerifyRequest(String cRaterUrl, String cRaterClientId, String itemId) {
    String cRaterVerificationResponse = CRaterHttpClient.getCRaterVerificationResponse(cRaterUrl, cRaterClientId, itemId);
    return cRaterVerificationResponse;
  }
}
