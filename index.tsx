//Oppgave 3 - Dynamisk Handleliste
//indext.tsx - LØSNING MED TYPESCRIPT

// Import necessary modules - React components
import * as React from 'react';
import { Component } from 'react-simplified';
import { createRoot } from 'react-dom/client';
import { Card, Row, Column, Button, Form, NavBar, Alert } from './widgets';
import { itemService, Item } from './services';
import { HashRouter, Route } from 'react-router-dom';

// Menu component for navigation
class Menu extends Component {
  render() {
    return (
      <NavBar brand="Shopping List">
        <NavBar.Link to="/shopping_list"></NavBar.Link> {/* Link to shopping list page */}
      </NavBar>
    );
  }
}

// Main component for shopping list - render shopping list page (FIG A)
class Handleliste extends Component {
  items: Item[] = []; // Array to store items
  newItem: Item = new Item(); // Object to store new item details

  render() {
    return (
      <>
        <Card title="Shopping List">
          <Card title="Add item">
            {/* Form for adding new item */}
            <Form.Label>Title:</Form.Label>
            <Form.Input 
              type="text"
              value={this.newItem.title}
              onChange={(event) => {
                this.newItem.title = event.target.value; // Update title of new item on input change
              }}
            />
            <Form.Label>Description:</Form.Label>
            <Form.Input 
              type="text"
              value={this.newItem.description}
              onChange={(event) => {
                this.newItem.description = event.target.value; // Update description of new item on input change
              }}
            />
            <Row>
              <Column>
                <Button.Success onClick={this.addItem}>Add Item</Button.Success> {/* Button to add new item */}
              </Column>
            </Row>
          </Card>
          <Card title="Items">
            {/* List of items */}
            {this.items.map((item) => (
              <Row key={item.id}>
                <Column>
                {/* If the item is not available, it will be colored red */}
                <div style={{color: item.not_available ? 'red' : 'black'}}>
                  {item.title}
                </div>
                <div style={{color: item.not_available ? 'red' : 'black'}}>
                  <small>{item.description}</small>
                </div>
                </Column>
                <Column right>
                  <Button.Success
                    onClick={() => 
                      itemService
                        .deleteItem(item.id) // Delete item on button click
                        .then(() => this.updateItems()) // Update items list after deletion
                    }
                  >
                    Picked up
                  </Button.Success>
                  <Button.Light
                    onClick= {() => { this.toggleItem(item.id)}} // Toggle item availability on button click
                  >
                    Not available
                  </Button.Light>
                </Column>
              </Row>
            ))}
          </Card>
        </Card>
      </>
    );
  }

  // Method to be called when component is mounted
  mounted() {
    this.updateItems(); // Update items list
  }

  // Method to update items list
  updateItems(): void{
    itemService.getItems().then((items) => {
      this.items = items; // Update items array with fetched items
    })
    .catch((error: Error) => 
      { console.error(error) 
        });
  }

  // Method to toggle item availability
  toggleItem(id: number) {
    itemService
    .toggleItem(id)
    .then(() => { this.updateItems() // Update items list after toggling
    })
    .catch((error: Error) => { console.error(error) });
  }

  // Method to add new item
  addItem(): void {
    itemService
    .addItem(this.newItem.title, this.newItem.description, this.newItem.not_available) // Add new item
    .then(() => {
      this.newItem.title = ''; // Reset new item title
      this.newItem.description = ''; // Reset new item description
      this.newItem.not_available = false; // Reset new item availability
      this.updateItems(); // Update items list after adding new item
    })
    .catch((error: Error) => { console.error(error) });
  }
}

// Get root element from DOM
let root:HTMLElement | null = document.getElementById('root');
if (root)
  createRoot(root).render(
    <div>
    <Alert />
    <HashRouter>
      <Menu />
      <Route exact path="/shopping_list" component={Handleliste} /> {/* Route for shopping list page */}
    </HashRouter>
  </div>,
  );