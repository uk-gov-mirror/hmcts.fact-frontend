Feature: Help and navigation
  Background:
    Given I am on FACT homepage

  Scenario: Beta phase banner
    Then I can view the phase banner at the top of that page
    And I can view the content information banner
    When I can select a hyperlink in the content banner

  Scenario Outline: Back path
    And I navigate to the Search Page
    When I select "I do not have the name"
    Then I am presented with the "What do you want to do? - Find a court or tribunal - GOV.UK" page
    Then I can select an "<options>" option from the list displayed
    Given I can continue having selected that option
    Then I am presented with the "Choose an area of law - Find a court or tribunal - GOV.UK" page
    When I select "#immigration-and-asylum" from the areas of law page and continue
    And I select the back button
    Then I am presented with the "Choose an area of law - Find a court or tribunal - GOV.UK" page
    When I select the back button
    Then I am presented with the "What do you want to do? - Find a court or tribunal - GOV.UK" page
    Examples:
      | options         |
      | nearest court   |
      | document court  |
      | update court    |
      | not listed      |