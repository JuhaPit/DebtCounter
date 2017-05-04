package fi.pitkanen.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller

public class SiteController{
	
	@RequestMapping(value = "/index", method = RequestMethod.GET)
	public String purchaseListing(Model model) {
		return "../static/index";
}
	
	@RequestMapping(value="/login", method = RequestMethod.GET)
	public String login(Model model){
		
		return "login";
	}	
}
