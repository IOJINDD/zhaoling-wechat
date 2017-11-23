<template>
    <section id="list-detail">
      <layout justify="flex-start"
              align="baseline">
        <flex>
          <slot name="title"></slot>
        </flex>
      </layout>
      <layout justify="flex-start"
              align="baseline">
        <flex class="text-left">
          <slot name="time"></slot>
          <slot name="status"></slot>
        </flex>
      </layout>
      <layout justify="flex-start"
              align="baseline">
        <flex>
          <slot name="content"></slot>
        </flex>
      </layout>
      <layout justify="space-between"
              align="baseline">
        <flex style="max-width: 70%">
          <slot name="address"></slot>
        </flex>
        <flex class="text-right">
          <slot name="type"></slot>
        </flex>
      </layout>
    </section>
  </template>
  <style>
    #list-detail {
      padding: 10px 8px;
      padding-bottom: 0px;
    }
  </style>
